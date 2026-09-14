---
paths:
  - "**/*.spec.ts"
  - "**/*.spec.tsx"
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "**/vitest.config.*"
  - "**/vite.config.*"
---

# Testing

- Vitest, run through Nx: `npx nx test <project>` or `npx nx affected -t test`. `globals: true` is on — `describe/it/expect` need no import, but importing `vi` explicitly is fine.
- Colocate as `Thing.spec.ts(x)` next to `Thing.ts(x)`. Don't create `__tests__` folders.
- `api`: `environment: 'node'`. `ui`/`web`: `jsdom`. In `web`, client components that import `next/navigation` need `vi.mock('next/navigation')`; server components are plain functions and can be called directly.
- Test behavior and contracts, not implementation: validation outcomes, filter results, adapter mapping, store transitions, rendered text/roles. Avoid snapshot tests.
- Mock at the boundary only: `vi.stubGlobal('fetch', …)` for partner APIs, in-memory store for Mongo if a test truly needs persistence. Don't mock modules you own.
- Use recorded fixtures for external shapes (`src/scraper/fixtures/*.json`) and keep them small — the fields the mapper reads, nothing else.
- A test that only proves the code was called is not a test. If you can't state what would break without it, delete it.
- `passWithNoTests: true` means an empty suite passes; if you skip writing tests for something non-trivial, say so.
