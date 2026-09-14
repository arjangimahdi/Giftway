---
description: Scaffold a shared ui component (tailwind-variants + story + export) — /component Chip
argument-hint: <ComponentName> [short description of variants]
---

Create the `packages/ui` component `$ARGUMENTS` by following the `ui-component` skill exactly: folder under `src/lib/<name>/`, `tv()` variants with token-backed classes, `Props` type, named + default export, a `.stories.tsx` with a story per variant, and the export lines in `src/index.ts`.

First check `packages/ui/src/index.ts` — if a component with this role already exists, extend it instead of adding a duplicate and say so.

Then run `npx nx run-many -t lint typecheck build -p ui` and start `npx nx storybook ui`; report the story URL and anything that looked off in light or dark.
