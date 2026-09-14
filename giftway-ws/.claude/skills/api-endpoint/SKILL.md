---
name: api-endpoint
description: Add an Express 5 route to apps/api with validation, a service, an optional Mongoose model, and tests. Use for any new HTTP endpoint or when wiring the recommend/click-tracking pipeline.
---

# Adding an endpoint to `apps/api`

## First time only

`apps/api/src/main.ts` currently defines routes inline. Before adding a second route, split it:

- `app.ts` — `export function createApp()` returning the configured Express app (json body parser with a small limit, CORS for `CLIENT_URL`, request-id + logging, routers, error middleware). No `listen`.
- `main.ts` — `import 'dotenv/config'`, build config from `process.env`, `createApp().listen(port)`, `connectToDatabase(uri)`.

## Steps

1. **Contract.** Define request/response types. If `web` consumes them, put the schema/type in a shared package (create `packages/contracts` via the `nx-workflow` skill if it doesn't exist) — never duplicate in both apps.
2. **Route** `src/routes/<name>.ts`:

   ```ts
   import { Router } from 'express';
   import { recommend } from '../services/recommend';

   export const recommendRouter = Router();

   recommendRouter.post('/recommend', async (req, res) => {
     const parsed = wizardPayloadSchema.safeParse(req.body);
     if (!parsed.success) {
       res
         .status(400)
         .json({ error: 'invalid payload', issues: parsed.error.issues });
       return;
     }
     res.json(await recommend(parsed.data, { requestId: req.id }));
   });
   ```

   Thin: parse → call service → respond. Async errors propagate to the error middleware (Express 5).

3. **Service** `src/services/<name>.ts` — the logic, framework-free, unit-testable.
4. **Model** (only if persisting) `src/models/<Name>.ts` — schema + `Doc` interface + `model()`. MVP persists click logs and analytics events only.
5. **Register** the router in `createApp()`.
6. **Tests** — `src/routes/<name>.spec.ts` hitting `createApp()` (supertest); `src/services/<name>.spec.ts` for logic. Mock `fetch` for partner calls; don't hit the network in tests.
7. **Verify:** `npx nx run-many -t lint typecheck test build -p @giftway-ws/api`, then `npx nx serve api` and `curl` it.

## SSE endpoints

For `POST /recommend`: set `Content-Type: text/event-stream`, `Cache-Control: no-cache`, `Connection: keep-alive`; write `event: progress\ndata: {json}\n\n` per stage; end with `event: result` and `res.end()`. Honor client disconnect (`req.on('close')`) by aborting the fan-out's `AbortController`. Enforce the hard timeout server-side (25–30 s) and emit `event: error` before closing.

## Redirect endpoint

`GET /go/:productId` — record the click (partner, product, position, session id), then `302` to the partner `productUrl` (later `affiliateUrl`). Never redirect to a URL that isn't one we produced.
