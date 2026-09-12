# Giftway Roadmap — Overview

The roadmap is split into phases that follow the end-to-end system flow: build the input (wizard), the brain (AI), the retrieval (scraper), the wait (waiting room), the output (results), then instrument and launch. Post-MVP features come last, gated on MVP learnings.

Each phase document contains:
- **Goal** — what the phase delivers
- **Depends on** — prior phases that must be done
- **Checklist** — concrete tasks, checkboxes to track progress
- **Done when** — exit criteria

## Phases

| Phase | Name | Goal | Status |
|---|---|---|---|
| 0 | [Foundation](phase-0-foundation.md) | Repo, stack decisions, partner/legal groundwork, design system basics | ⬜ Not started |
| 1 | [Wizard](phase-1-wizard.md) | Working 5-step wizard with chips + free-text, validation, session persistence | ⬜ Not started |
| 2 | [AI Query Generation](phase-2-ai-query-generation.md) | Wizard payload → structured, diverse query intents with rationale | ⬜ Not started |
| 3 | [Scraper & Partners](phase-3-scraper-and-partners.md) | Real-time multi-partner product retrieval, hard filtering, affiliate links | ⬜ Not started |
| 4 | [Waiting Room](phase-4-waiting-room.md) | Personalized staged loading experience, timeouts, reassurance states | ⬜ Not started |
| 5 | [Results & Edge Cases](phase-5-results-and-edge-cases.md) | Results page, all required edge-case states, refine loop | ⬜ Not started |
| 6 | [Analytics & Launch](phase-6-analytics-and-launch.md) | KPI instrumentation, QA, MVP launch | ⬜ Not started |
| 7 | [Post-MVP](phase-7-post-mvp.md) | Accounts, event calendar, group gifting, cards, price alerts, B2B | ⬜ Not started |

Status legend: ⬜ Not started · 🟨 In progress · ✅ Done

## MVP Boundary

Phases 0–6 constitute the MVP. Phase 7 begins only after MVP KPIs (see [08 — Success Metrics](../product/08-success-metrics.md)) have been collected and reviewed.

## Dependency Graph

```
Phase 0 (Foundation)
   ├── Phase 1 (Wizard) ──────────────┐
   ├── Phase 2 (AI Query Gen) ────────┤
   └── Phase 3 (Scraper & Partners) ──┤
                                      ↓
                        Phase 4 (Waiting Room)
                                      ↓
                        Phase 5 (Results & Edge Cases)
                                      ↓
                        Phase 6 (Analytics & Launch)
                                      ↓
                        Phase 7 (Post-MVP)
```

Phases 1, 2, and 3 can proceed in parallel after Phase 0. Phase 4 needs real backend timing from 2+3 to calibrate stage durations; Phase 5 needs all three.
