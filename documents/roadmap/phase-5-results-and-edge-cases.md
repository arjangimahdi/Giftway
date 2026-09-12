# Phase 5 — Results Page & Edge Cases

**Status:** ⬜ Not started
**Depends on:** [Phase 3 — Scraper & Partners](phase-3-scraper-and-partners.md) · [Phase 4 — Waiting Room](phase-4-waiting-room.md)
**References:** [06 — Results & Edge Cases](../product/06-results-and-edge-cases.md) · [08 — Success Metrics](../product/08-success-metrics.md)

## Goal

Display real, purchasable products with price, partner, AI rationale, and a prominent affiliate CTA. Handle every required MVP edge case with an empathetic, actionable state, and give users a "Refine my answers" loop that preserves their inputs.

## Checklist

### Product card
- [ ] Product image and title from scraped data (with image fallback placeholder)
- [ ] Current scraped price in local currency, clearly formatted
- [ ] Source partner badge/name (Digikala, Snapshop, …)
- [ ] AI rationale — short, human-readable "why this was chosen", visually prominent (not fine print)
- [ ] "View on [Partner]" affiliate CTA — primary button, fires the tracked link via the redirect endpoint
- [ ] Opens partner in a new tab so the shortlist remains available

### Results layout
- [ ] Responsive grid/list of cards (mobile-first)
- [ ] Header summarizing the request in the user's terms (recipient, occasion, budget)
- [ ] Ordering follows backend ranking; optional category diversity grouping
- [ ] "Refine my answers" CTA returns to the wizard with all prior inputs preserved
- [ ] "Start over" secondary action (clears state) clearly distinguished from Refine

### Edge-case states
- [ ] **Zero results:** empathetic empty state + one-click "Relax budget" action + link back to Step 4/5
- [ ] **Partial results (< 3):** still shows what was found; soft prompt suggesting broader inputs
- [ ] **Partner outage:** results render from remaining partner(s); optional subtle notice that one source was unavailable
- [ ] **Budget too low for category:** cards show substitute/accessory-tier picks with rationale that acknowledges the constraint
- [ ] **Conflicting inputs:** verify anti-preference precedence end-to-end (no excluded items rendered)
- [ ] **Backend timeout / error:** apology state + retry (shared with Phase 4)

### Trust & clarity
- [ ] Rationale copy references the user's inputs where possible ("Because they love Gaming and you said no gag gifts…")
- [ ] Disclosure that links are affiliate links (per partner/legal requirements)
- [ ] Price freshness hint (e.g., "Price checked just now")

### Instrumentation hooks
- [ ] Emit events: results_viewed (count, partial flag, zero flag), affiliate_click (product, partner, position), refine_clicked, relax_budget_clicked, start_over_clicked
- [ ] Optional post-result micro-survey: thumbs up/down "Was the wait worth it?"

### Quality
- [ ] Render tests for each edge-case state with fixture data
- [ ] Test: Refine preserves all five steps' inputs
- [ ] Test: affiliate click fires tracking before redirect
- [ ] Qualitative test session (≥ 5 users) focused on rationale trust and CTA clarity

## Done when

- Every card shows image, title, price, partner, rationale, and working affiliate CTA
- All six edge cases from the spec have a dedicated, tested UI state
- "Refine my answers" round-trips with zero data loss
- Results and click events are emitted for analytics
