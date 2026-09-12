# Phase 6 — Analytics, QA & MVP Launch

**Status:** ⬜ Not started
**Depends on:** [Phase 5 — Results & Edge Cases](phase-5-results-and-edge-cases.md) (all prior phases complete)
**References:** [08 — Success Metrics](../product/08-success-metrics.md) · [07 — Scope](../product/07-scope.md)

## Goal

Instrument the full funnel so every KPI in the PRD is measurable from day one, harden the product for real traffic, and launch the MVP. The MVP exists to validate the core recommendation loop, so analytics is not optional.

## Checklist

### Analytics instrumentation
- [ ] Choose analytics tooling and set up a session identifier (no accounts — anonymous sessions)
- [ ] Landing page view → wizard start event (**Wizard Start Rate**)
- [ ] Step viewed / step completed events for Steps 1–5 (**Per-step drop-off**)
- [ ] Wizard submitted event (**Wizard Completion Rate**)
- [ ] Step 4 completion indicator (chips or free-text filled) — leading indicator of quality
- [ ] Waiting room entered / abandoned / results received (**Bounce Rate During Wait**)
- [ ] Wait-satisfaction micro-survey response (**Perceived Wait Satisfaction**)
- [ ] Results viewed with zero/partial flags (**Zero/Low-Result Rate**)
- [ ] Affiliate click event (**Affiliate CTR** — North Star)
- [ ] Partner postback / conversion ingestion where available (**Affiliate Conversion Rate**)
- [ ] Refine-clicked event (**Refinement Rate**)

### Dashboard
- [ ] Funnel dashboard: landing → Step 1 → … → Step 5 → wait → results → affiliate click
- [ ] KPI tiles with the illustrative thresholds: Completion ≥ 60%, Wait bounce ≤ 15%, Zero-result ≤ 5%, Affiliate CTR ≥ 25%
- [ ] Partner health view: failure rate, latency, result counts per partner
- [ ] AI quality view: intents per request, schema failures, fallback rate

### Hardening
- [ ] Error monitoring / crash reporting on frontend and backend
- [ ] Backend logging with request IDs across AI → scraper → filter
- [ ] Rate limiting / abuse protection on the recommendation endpoint
- [ ] Secrets audit (AI keys, partner credentials not in client bundle)
- [ ] Performance budget check: p95 end-to-end within 15s; waiting room never exceeds hard timeout silently

### QA
- [ ] Full end-to-end test: wizard → waiting room → results → affiliate redirect
- [ ] Cross-browser and mobile device pass
- [ ] Accessibility pass (keyboard, screen reader labels, reduced motion)
- [ ] Copy and localization review (currency formatting, partner names)
- [ ] Bug bash with the whole team using the three personas (Last-Minute Panicker, Thoughtful Planner, Distant Relative/Colleague)

### Launch
- [ ] Production deployment pipeline and environment
- [ ] Landing page with clear value proposition and single "Find a gift" CTA
- [ ] Privacy policy and affiliate disclosure published
- [ ] Soft launch to a limited audience; monitor dashboard for 1–2 weeks
- [ ] Review KPIs against illustrative thresholds; document learnings
- [ ] Go / no-go decision on wider launch and on starting Phase 7

## Done when

- Every KPI in [08 — Success Metrics](../product/08-success-metrics.md) is visible on the dashboard
- The MVP is live for real users with monitoring and alerting in place
- A written post-soft-launch review exists with calibrated (not illustrative) KPI targets
