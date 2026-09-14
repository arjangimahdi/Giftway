---
description: Run lint, typecheck, test, and build for affected projects and fix what fails
allowed-tools: Bash(npx nx *), Read, Edit, Grep, Glob
---

Run `npx nx affected -t lint typecheck test build` from the workspace root (`$ARGUMENTS` may name projects to use `-p` instead).

If Nx says the workspace is out of sync, run `npx nx sync` first and include the tsconfig changes.

For each failure: read the error, open the file, fix the root cause (not the symptom — no `// eslint-disable`, no `as any`, no deleted test), re-run only the failed target with `npx nx run <project>:<target>`. Stop and ask if a fix would change product behavior.

Finish with one line per project: pass/fail and what you changed.
