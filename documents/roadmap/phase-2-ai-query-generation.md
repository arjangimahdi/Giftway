# Phase 2 — AI Query Generation

**Status:** ⬜ Not started
**Depends on:** [Phase 0 — Foundation](phase-0-foundation.md)
**References:** [04 — System Flow & Architecture](../product/04-system-flow-and-architecture.md) · [09 — Risks & Open Questions](../product/09-risks-and-open-questions.md)

## Goal

Build the AI layer that converts the subjective, multi-select wizard payload into **multiple, diverse, structured query intents** the scraper can consume deterministically. Output must be structured JSON — never freeform prose.

## Checklist

### Backend endpoint
- [ ] Endpoint that accepts the wizard payload and returns a list of query intents
- [ ] Input validation against the wizard payload schema
- [ ] Request/response logging (payload → intents) for quality review, with PII considerations noted

### Prompt & schema design
- [ ] Finalize the query intent JSON schema: `search_term`, `category_hint`, `relevance_rationale`, `constraint_tags` (excluded categories, price ceiling/floor)
- [ ] Write the system prompt that maps wizard inputs to intents
- [ ] Enforce structured output (schema-constrained / tool-use style output, not parsed prose)
- [ ] Require **multiple diverse intents per request** (define target count, e.g., 6–10, spanning different categories)
- [ ] Rationale text is short, human-readable, and written for the end user (it is surfaced on product cards)
- [ ] Constraint tags carry through Step 4 anti-preferences and Step 5 budget verbatim

### Anti-preference & conflict handling
- [ ] Anti-preferences (dislikes, allergies, already-owns) are always emitted as hard exclusion constraints
- [ ] Conflicting inputs (e.g., "No gadgets" + "Tech & Gadgets" interest): anti-preference wins
- [ ] "Already owns X" produces intents for accessories/complements of X rather than X itself, where sensible

### Budget-aware generation
- [ ] Intents respect the budget range; when a category is unaffordable, generate accessory-tier / substitute intents
- [ ] Rationale acknowledges the constraint when substituting (e.g., "Within your budget, here's a tech-themed pick...")

### Free-text long tail
- [ ] Free-text from every step is included in the prompt context
- [ ] Build an evaluation set of hyper-specific free-text inputs (≥ 30 cases) covering brands, niche hobbies, and contradictions
- [ ] Manually review intent quality on the evaluation set; iterate on the prompt
- [ ] Guardrails against hallucinated brands/products in `search_term` (prefer generic searchable phrasing)

### Reliability & performance
- [ ] Timeout and retry policy for the AI call (fits within the 5–15s end-to-end budget)
- [ ] Fallback behavior if the AI call fails (e.g., rule-based intents from chips only)
- [ ] Measure and record p50/p95 latency of the AI step

### Quality
- [ ] Automated schema validation test on AI output
- [ ] Golden tests: representative payloads → expected intent categories
- [ ] Test: anti-preference conflict precedence

## Done when

- Every valid wizard payload yields a schema-valid list of diverse intents with user-facing rationale
- Anti-preferences are never violated in emitted intents
- AI step p95 latency is within its share of the end-to-end budget
- Evaluation set reviewed and prompt signed off
