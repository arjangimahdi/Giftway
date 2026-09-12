# Phase 3 — Scraper Service & Partner Integration

**Status:** ⬜ Not started
**Depends on:** [Phase 0 — Foundation](phase-0-foundation.md) (partner legal decisions)
**References:** [04 — System Flow & Architecture](../product/04-system-flow-and-architecture.md) · [06 — Results & Edge Cases](../product/06-results-and-edge-cases.md)

## Goal

Build the real-time retrieval layer: take a list of query intents, query multiple partner sites concurrently, normalize results into the product schema, enforce budget and anti-preferences as **hard filters**, rank, and attach affiliate links. Must degrade gracefully when a partner fails.

## Checklist

### Service architecture
- [ ] Scraper service module with a per-partner adapter interface (`search(intent) → products[]`)
- [ ] Concurrent fan-out: all intents × all partners run in parallel with a global time budget
- [ ] Per-partner timeout so one slow partner cannot block the response
- [ ] Partial-failure handling: partner errors/timeouts are logged and skipped, not propagated
- [ ] Response normalization into the product result schema (image, title, price, currency, partner, URL)

### Partner adapters
- [ ] Digikala adapter (API or scraper, per Phase 0 legal decision)
- [ ] Snapshop adapter (API or scraper, per Phase 0 legal decision)
- [ ] Adapter contract tests with recorded fixtures so layout/API changes are caught early
- [ ] Rate limiting / politeness per partner (respect documented limits)
- [ ] User-agent, headers, and anti-bot considerations documented per partner
- [ ] Health check per adapter (detects broken selectors / changed responses)

### Filtering & ranking
- [ ] **Hard filter:** price within Step 5 min/max (never a soft signal)
- [ ] **Hard filter:** exclude products matching anti-preference constraint tags (categories, keywords)
- [ ] Deduplicate the same product across intents/partners
- [ ] Ranking that balances relevance, diversity across categories, and partner mix
- [ ] Attach the originating intent's `relevance_rationale` to each product
- [ ] Target shortlist size defined (e.g., 6–12) with minimum-threshold flag (< 3 → "partial")

### Affiliate links
- [ ] Build tracked affiliate URL per partner from the product URL
- [ ] Click-tracking redirect endpoint (records click, then forwards to partner)
- [ ] Verify tracking parameters survive the redirect to each partner

### Edge-case support (backend side)
- [ ] Zero-result response shape with a reason (too narrow, partner outage, etc.)
- [ ] Partial-result response shape (results + `partial: true` flag)
- [ ] Budget-too-low detection surfaced to the results layer

### Reliability & performance
- [ ] End-to-end (AI + scrape + filter) p50/p95 latency measured; target 5–15s
- [ ] Hard server-side timeout aligned with the waiting room's 25–30s cap
- [ ] Short-lived caching of partner responses for identical queries (freshness window defined)
- [ ] Alerting when a partner's failure rate exceeds a threshold

### Quality
- [ ] Unit tests: budget filter, anti-preference filter, dedupe, ranking
- [ ] Integration test: one partner failing still returns results from the other
- [ ] Load test at expected MVP concurrency

## Done when

- A list of intents returns a normalized, filtered, ranked shortlist with affiliate links from ≥ 2 partners
- A single partner outage never fails the request
- No product outside the budget or violating an anti-preference appears in results
- p95 end-to-end latency is within the 15s target under normal conditions
