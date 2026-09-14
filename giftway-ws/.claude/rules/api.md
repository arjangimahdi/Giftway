---
paths:
  - 'apps/api/**'
---

# api — Express 5 + Mongoose

## Layout

```
apps/api/src/
  main.ts            bootstrap only: env, app, listen, DB connect — no routes here
  app.ts             createApp(): middleware + routers, no listen (tests import this)
  db.ts              connectToDatabase / isDatabaseConnected
  routes/<name>.ts   one Router per resource; thin: parse → service → respond
  services/<name>.ts business logic; no req/res here
  models/<Name>.ts   Mongoose schema + model, one per file, PascalCase
  ai/                prompt + structured-output call for query intents
  scraper/           adapters/<partner>.ts implementing search(intent, {signal}) → Product[]
                     fanout.ts (concurrency + per-partner timeout), filter.ts, rank.ts
  lib/               small pure helpers
```

Split `main.ts` into `app.ts` + `main.ts` the first time a route beyond `/health` is added.

## Conventions

- Express 5: async handlers may `throw`; rely on that instead of `try/catch` + `next(err)` in every route. One error middleware at the end of `createApp()`.
- Validate every request body at the boundary with a schema; return `400` with the issues. Trust internal code after that.
- Config is read from `process.env` in `main.ts` (`dotenv/config` is already imported). Pass values down; don't read `process.env` deep inside services.
- Log with structured objects, not string concatenation. Thread a request id from the entry point through AI → scraper → filter so one user request can be traced end to end.
- Never expose the AI provider key to the client. It lives in `.env` as `ANTHROPIC_API_KEY` and is read only here.

## Mongoose

- One model per file in `models/`, `export const Product = model<ProductDoc>('Product', productSchema)`. Define a `Doc` interface alongside the schema.
- MVP persistence is small: click logs and anonymous analytics events. Don't model users, sessions, or accounts (no accounts in MVP).
- Prefer `lean()` for read paths that don't need documents.
- `MONGODB_URI` defaults to `mongodb://localhost:27017/giftway` outside Docker and `mongodb://mongo:27017/giftway` inside Compose.

## Recommendation pipeline

`POST /recommend` keeps the connection open and streams progress as Server-Sent Events (`understanding → generating → searching → filtering → finalizing → done | error`), ending with the full result. Not a job queue, not polling.

- Scraper fan-out: `Promise.allSettled` over intents × partners, one `AbortController` per partner call, global time budget aligned with the 25–30 s hard timeout. A failed/slow partner is dropped and reported in `failedPartners`, never propagated as a request failure.
- Filtering is a separate pure step after fetch: price within `[min, max]` and anti-preference exclusion are hard drops. Then dedupe, then rank.
- Digikala adapter: `GET https://api.digikala.com/v1/search/?q=<term>`; product fields at `data.products[]` → `id`, `title_fa`/`title_en`, `images.main.url[0]`, `default_variant.price.selling_price` (Rial → ÷10 → Toman), `url.uri` (prefix `https://www.digikala.com`), category hints in `data_layer.item_category2..5`. Validate each mapped product; drop malformed ones rather than failing the batch. Set a descriptive `User-Agent` and a self-imposed rate limit.
- Cache partner responses in memory (or Redis later) keyed by `(partner, normalized term)` with a TTL in minutes, not hours — freshness of price/availability is a product requirement.

## Testing

- `app.ts` is importable without side effects; test routes with supertest-style requests against `createApp()`.
- Adapters get contract tests against recorded JSON fixtures in `src/scraper/fixtures/`, mocking `fetch` (Node 22 global). Cover: happy path, missing price/url skipped, non-2xx throws, `AbortSignal` forwarded.
- Pure filter/rank/dedupe functions get plain unit tests.
