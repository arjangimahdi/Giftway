---
description: Review the current diff (or a PR/branch) with the reviewer agent
argument-hint: [PR number | branch]
---

Use the `reviewer` subagent to review `$ARGUMENTS` (default: the uncommitted working-tree diff). Pass it the scope explicitly. When it returns, present its findings unchanged, then ask whether to apply the "must fix" items.
