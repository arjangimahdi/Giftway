---
description: Audit a roadmap phase against the code and update its checklist — /roadmap phase-1
argument-hint: <phase-N or feature>
---

Use the `spec-checker` subagent on `$ARGUMENTS`. With its report, update `documents/roadmap/<phase>.md`: tick only items it marked implemented with evidence, append an em-dash pointer to the evidence, update the `**Status:**` line per the `product-spec` skill rules, and leave everything else untouched. Show the diff of the roadmap file and list what remains open.
