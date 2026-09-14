# Giftway

AI-powered gift recommender. A 5-step wizard (recipient → occasion → interests → anti-preferences → budget) is turned by an LLM into search intents, products are fetched from a partner in real time, hard-filtered by budget and anti-preferences, and shown with a per-product rationale and an outbound link. Affiliate business model: no inventory, no checkout.

Product spec and roadmap: `documents/` (start at `documents/README.md`). Treat those documents as the source of truth for behavior; treat this file and `.claude/rules/` as the source of truth for how code is written here.

## Workspace

Nx monorepo in `giftway-ws/`, npm workspaces, TypeScript everywhere. Package scope is `@giftway-ws`. All paths and commands below (and in `.claude/rules/`, skills, and commands) are relative to `giftway-ws/` — `cd giftway-ws` before running anything.

| Nx project        | Path              | Stack                                          | Role                                                 |
| ----------------- | ----------------- | ---------------------------------------------- | ---------------------------------------------------- |
| `web`             | `apps/web`        | React 19, Next.js 16 (App Router), Tailwind v4 | Wizard, waiting room, results (SSR for SEO)          |
| `@giftway-ws/api` | `apps/api`        | Express 5, Mongoose 9 (MongoDB), webpack build | Recommendation pipeline, click tracking              |
| `tokens`          | `packages/tokens` | style-dictionary (DTCG JSON)                   | Design tokens → Tailwind `@theme` CSS + TS constants |
| `ui`              | `packages/ui`     | React, tailwind-variants, Storybook 10         | Shared components                                    |

Dependency direction: `web` → `ui` → `tokens`. `api` depends on neither. Never import from an app into a package.

## Commands

Always go through Nx; never call next/vite/vitest/tsc/webpack directly.

```sh
npx nx serve api                 # http://localhost:3333 (needs MongoDB: docker compose up mongo -d)
npx nx serve web                 # http://localhost:4200
npx nx storybook ui
npx nx run tokens:generate       # after editing packages/tokens/tokens/*.json
npx nx affected -t lint typecheck test build
npx nx run-many -t lint typecheck test build
npx nx sync                      # when TS project references are out of date
```

Before saying a task is done: `npx nx affected -t lint typecheck test build` passes, and for UI work you have looked at it (Storybook or the app), not just compiled it.

## Product invariants (do not negotiate these in code)

- **Anti-preferences and budget are hard filters**, never ranking signals. A product outside `[min, max]` or matching a dislike/allergy/already-owns never reaches the response. When an interest conflicts with an anti-preference, the anti-preference wins.
- **Every wizard step offers chips and a visible free-text field.** A user must be able to finish with zero typing; free text must never be hidden behind a toggle. Step 4 (anti-preferences) is optional but framed positively ("Help us avoid a miss") and never visually deprioritized.
- **Currency is Toman (`IRT`).** The Digikala API returns Rial; divide by 10 at the adapter boundary and nowhere else.
- **Single partner for MVP: Digikala**, via its public JSON search API (`https://api.digikala.com/v1/search/?q=`). Snapp Shop was evaluated and excluded (its `robots.txt` forbids search/API access) — do not add it. See `documents/engineering/partner-scraping-decisions.md` if present.
- **Latency budget:** 5–15 s expected, 25–30 s hard timeout. The waiting room must show staged, personalized progress driven by real backend events (SSE), never a static spinner and never an infinite wait.
- **Edge cases are features:** zero results, partial (<3), partner outage, budget-too-low, and timeout each have a defined state (see `documents/product/06-results-and-edge-cases.md`). Don't collapse them into a generic error.
- **No accounts in MVP.** Wizard state lives in `localStorage`; nothing user-identifying is stored server-side beyond anonymous analytics events.
- **Scraping-first; affiliate deferred.** Keep an `affiliateUrl` field (nullable) on product results so affiliate links are a data change later, not a schema change.

## Code conventions (summary — details in `.claude/rules/`)

- Prettier is the formatter (single quotes, trailing commas). Don't hand-format.
- Colors, spacing, radius, and type come from `@giftway-ws/tokens` via Tailwind utilities (`bg-primary-500`, `text-muted`, `rounded-md`). Never write raw hex or `px` values in components.
- Shared, reusable UI lives in `packages/ui` with a story per component. App-specific composition lives in `apps/web`.
- Shared types/contracts between `web` and `api` are exported from a package, not duplicated.
- Tests are Vitest, colocated as `*.spec.ts(x)`. `passWithNoTests` is on, so a missing test is a choice, not a CI failure — make it a deliberate one.
- Generated files (`packages/tokens/src/generated/**`, any `dist/`, `out-tsc/`, `package-lock.json`) are never edited by hand; a hook blocks it.
- Comments only where the _why_ is non-obvious. No "added for X" or task-reference comments.

## Brand

Direction "Tagged": lavender accent `primary-500 #9184d9` / `primary-700 #5d5294`, light-first (`neutral-50 #f3f5fe` ground, `neutral-800 #292b31` ink) with a dark toggle (`neutral-900 #161826` ground, `#e9e9ed` ink). Inter for UI, IBM Plex Mono for labels/prices. Pill chips, 8 px buttons, 14 px cards. Logo is a rounded lavender tag with a bold "G". Copy is confident, warm, plain — apologetic only in the timeout state. Copy deck: `documents/design/copy-deck.md` if present.

## Open decisions (ask, don't assume)

- Minimum budget floor in Toman (Step 5) — not yet decided; presets are placeholders.
- Formal legal/ToS review of Digikala scraping — outstanding; `robots.txt` is a technical signal only.
