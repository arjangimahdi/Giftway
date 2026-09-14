---
description: Answer a product/behavior question from ../documents with citations — /spec what happens on zero results
argument-hint: <question>
allowed-tools: Read, Grep, Glob
---

Answer `$ARGUMENTS` using only `../documents/` (map in the `product-spec` skill). Quote the governing lines with file path and heading. If the docs don't cover it, say so explicitly and list the closest related requirement — don't fill gaps with assumptions. If the answer conflicts with something already in the code, point to the code location too.
