---
name: product-spec
description: Find and apply the Giftway product requirements, roadmap phases, and design decisions in documents. Use before implementing any user-facing behavior, when asked "what should X do", or when updating roadmap checklists.
---

# Product spec navigation

All product truth is in `documents/` (one level above the Nx workspace). Read the relevant file before implementing; don't reconstruct requirements from memory.

## Where things are

| Question                                                             | File                                                      |
| -------------------------------------------------------------------- | --------------------------------------------------------- |
| Why does this product exist, business model                          | `product/01-vision-and-business-model.md`                 |
| Who the users are, why a wizard not a chatbot                        | `product/02-users-and-problem-discovery.md`               |
| Exact chips, validation, per-step rules                              | `product/03-wizard-specification.md`                      |
| Pipeline, AI contract (query intents), scraper expectations, latency | `product/04-system-flow-and-architecture.md`              |
| Waiting-room stages, durations, timeouts, "no dead air"              | `product/05-waiting-room-ux.md`                           |
| Result card fields, the six edge cases, refine loop                  | `product/06-results-and-edge-cases.md`                    |
| What's in/out of MVP                                                 | `product/07-scope.md`                                     |
| KPIs and which events to emit                                        | `product/08-success-metrics.md`                           |
| Known risks                                                          | `product/09-risks-and-open-questions.md`                  |
| Vocabulary                                                           | `product/10-glossary.md`                                  |
| Phase checklists                                                     | `roadmap/phase-0…7-*.md`, overview in `roadmap/README.md` |
| Architecture decisions                                               | `adr/*.md` (if present)                                   |
| Partner scraping findings                                            | `engineering/partner-scraping-decisions.md` (if present)  |
| Wireframes, copy deck                                                | `design/*.md` (if present)                                |

## Applying it

- Quote the specific requirement you're implementing in your plan (file + line or heading). If the code you're about to write contradicts the doc, stop and say so — the doc may be wrong, but that's the user's call.
- Chip lists, stage names, and edge-case names in code should match the doc's vocabulary (glossary) so the two stay searchable against each other.
- KPI events in `08-success-metrics.md` map 1:1 to analytics event names; use those names.

## Roadmap checklists

When work lands, tick the matching `- [ ]` items in the phase file and append a short pointer (file path or command) after an em dash, e.g. `- [x] Session persistence — apps/web/src/app/wizard/store.ts`. Flip the phase `**Status:**` to 🟨 when the first item is ticked and ✅ only when the "Done when" list is fully true. Never tick items you haven't verified.

## Decisions already made (don't reopen without being asked)

- Wizard, not chatbot. Scraping first, affiliate later. Digikala only; Snapp Shop excluded. Toman currency. SSE for progress. `localStorage` for wizard state; no accounts. Brand direction "Tagged", light-first with dark toggle.
