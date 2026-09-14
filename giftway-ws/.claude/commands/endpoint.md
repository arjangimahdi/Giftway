---
description: Add an Express route + service (+ model, tests) to apps/api — /endpoint POST /recommend
argument-hint: <METHOD> <path> [what it does]
---

Add the endpoint `$ARGUMENTS` to `apps/api` by following the `api-endpoint` skill: split `main.ts` into `app.ts` + `main.ts` if not already done, route in `src/routes/`, logic in `src/services/`, model in `src/models/` only if it persists something, register in `createApp()`, tests against `createApp()`.

Check `../documents/product/04-system-flow-and-architecture.md` and `06-results-and-edge-cases.md` for the contract before writing it; if the endpoint is the recommend pipeline, it must stream SSE progress and honor the hard timeout.

Verify with `npx nx run-many -t lint typecheck test build -p @giftway-ws/api`, then `npx nx serve api` and a `curl` against it. Report the request/response shape you implemented.
