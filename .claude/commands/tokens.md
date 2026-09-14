---
description: Regenerate design tokens after editing packages/tokens/tokens/*.json and show what changed
allowed-tools: Bash(npx nx *), Bash(git diff*), Read
---

Run `npx nx run tokens:generate`, then `git diff -- packages/tokens/src/generated/` and summarize exactly which CSS variables changed (old → new). If `$ARGUMENTS` names a token, confirm it appears in `theme.css` with the expected Tailwind namespace (see the `design-tokens` skill mapping table). Finally run `npx nx run-many -t build -p ui web` to prove consumers still compile.
