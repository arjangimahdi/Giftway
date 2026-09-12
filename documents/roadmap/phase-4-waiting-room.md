# Phase 4 — The Waiting Room

**Status:** ⬜ Not started
**Depends on:** [Phase 1 — Wizard](phase-1-wizard.md) · [Phase 2 — AI Query Generation](phase-2-ai-query-generation.md) · [Phase 3 — Scraper & Partners](phase-3-scraper-and-partners.md)
**References:** [05 — Waiting Room UX](../product/05-waiting-room-ux.md)

## Goal

Replace "dead time" with a personalized, staged "AI thinking" experience that tracks real backend progress, never sits static for more than ~2 seconds, reassures on long waits, and fails gracefully at the hard timeout.

## Checklist

### Stage engine
- [ ] Stage sequencer that plays stages in order: Understanding → Query Generation → Searching Partners → Filtering → Finalizing
- [ ] Per-stage min/max duration clamps (defaults: 1–2s, 2–3s, 3–6s, 2–3s, 1–2s)
- [ ] Pacing loosely tracks real backend progress (e.g., via streamed progress events or polling); never jumps ahead of reality, never lags into "stuck"
- [ ] Fast-backend handling: if results arrive early, remaining stages compress to their minimums rather than being skipped abruptly
- [ ] Slow-backend handling: last stage holds with active animation until results arrive

### Personalized stage content
- [ ] Stage 1 copy references the recipient from Step 1 / interests from Step 3 ("Understanding what makes [Recipient] tick...")
- [ ] Stage 2 animates in category chips pulled from Step 3 selections
- [ ] Stage 3 shows partner logos (Digikala, Snapshop, …) cycling/pulsing
- [ ] Stage 4 subtly references Step 4 anti-preferences ("Filtering out anything they already have or dislike...")
- [ ] Stage 5 shows a progress bar nearing completion
- [ ] Copy templates handle missing inputs gracefully (e.g., no name given, no anti-preferences)

### No dead air
- [ ] Every stage has a continuous animation (no static frame > ~2s)
- [ ] Reduced-motion variant that still visibly updates (text/progress changes) for accessibility

### Reassurance & timeout
- [ ] Reassurance state at the defined threshold (e.g., 20s): "Still working — great gifts take a little extra thought"
- [ ] Hard timeout (25–30s, aligned with backend cap): apology state + retry CTA — never infinite loading
- [ ] Retry re-submits the same payload without returning to the wizard
- [ ] Empty/partial backend response transitions to the Phase 5 empty/low-result state, not an error

### Instrumentation hooks
- [ ] Emit events: waiting_room_entered, stage_changed, reassurance_shown, timeout_shown, results_received, waiting_room_abandoned
- [ ] Record actual wait duration per session (feeds Bounce-During-Wait KPI)

### Quality
- [ ] Test stage pacing with mocked backends: fast (2s), nominal (10s), slow (22s), timeout (35s)
- [ ] Visual review on mobile and desktop
- [ ] Copy review for tone (confident, warm, not apologetic until timeout)

## Done when

- The waiting room references the user's actual inputs in at least three stages
- No static screen for more than ~2 seconds in any backend timing scenario
- Reassurance and timeout states trigger at the configured thresholds
- All waiting-room events are emitted for analytics
