---
name: nx-workflow
description: How to run, build, test, and generate code in the Giftway Nx workspace. Use before running any task, adding a project, or when Nx reports the workspace is out of sync.
---

# Nx workflow for Giftway

## Projects

`npx nx show projects` lists them. Names: `web`, `@giftway-ws/api`, `ui`, `tokens`. Targets are inferred by plugins in `nx.json` (`@nx/vite`, `@nx/webpack`, `@nx/vitest`, `@nx/eslint`, `@nx/js/typescript`, `@nx/storybook`); see a project's targets with `npx nx show project <name> --web=false`.

## Everyday

| Want                 | Run                                                  |
| -------------------- | ---------------------------------------------------- |
| Dev API              | `docker compose up mongo -d && npx nx serve api`     |
| Dev web              | `npx nx serve web`                                   |
| Storybook            | `npx nx storybook ui`                                |
| Regenerate tokens    | `npx nx run tokens:generate`                         |
| Check what I touched | `npx nx affected -t lint typecheck test build`       |
| Check everything     | `npx nx run-many -t lint typecheck test build`       |
| One project          | `npx nx run-many -t lint typecheck test build -p ui` |
| Format               | `npx nx format:write`                                |
| Graph                | `npx nx graph`                                       |

Skip the cache when a result looks stale: add `--skip-nx-cache`.

## "The workspace is out of sync"

Nx keeps TypeScript project references in every `tsconfig.json` in step with the import graph. When it complains, run `npx nx sync` and commit the tsconfig changes. CI runs `nx sync:check`, so don't leave it.

## Adding things

- New shared package: `npx nx g @nx/js:lib packages/<name> --importPath=@giftway-ws/<name> --bundler=none --unitTestRunner=vitest`, then add it to `tsconfig.base.json` paths if the generator didn't, and `npx nx sync`.
- New React component in `ui`: don't use a generator — follow the `ui-component` skill (the generator's output doesn't match the tailwind-variants pattern).
- New API route: follow the `api-endpoint` skill.

## Gotchas in this workspace

- `apps/api` builds with webpack to `apps/api/dist/main.js`; `nx serve api` runs that build first. Source changes rebuild automatically.
- `tsconfig.base.json` uses `module: nodenext`; `ui` and `web` override to `bundler` in their `tsconfig.*.json`. If a new project gets "relative import paths need explicit file extensions", it needs the same override.
- `test` depends on `^build` (see `targetDefaults`), so the first test run builds `tokens`/`ui`. That's expected.
- Vitest has `passWithNoTests: true` in `api` and `ui`; an empty suite is green.
- `.env` is read by `apps/api` via `dotenv/config`; `web` reads `VITE_*` at build time.
