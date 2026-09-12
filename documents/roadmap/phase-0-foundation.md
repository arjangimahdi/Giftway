# Phase 0 — Foundation

**Status:** ⬜ Not started
**Depends on:** —
**References:** [01 — Vision & Business Model](../product/01-vision-and-business-model.md) · [09 — Risks & Open Questions](../product/09-risks-and-open-questions.md)

## Goal

Establish the project skeleton, key technical decisions, and the business/legal groundwork required before scraping partner sites in production. Nothing user-facing ships in this phase; it exists to unblock Phases 1–3 in parallel.

## Checklist

### Project setup
- [ ] Initialize git repository and base project structure (frontend, backend, shared)
- [ ] Choose and document the tech stack (frontend framework, backend runtime, AI provider, scraping approach)
- [ ] Set up local development environment and README with run instructions
- [ ] Set up linting, formatting, and basic CI (build + tests on push)
- [ ] Define environment/config management (API keys for AI provider, partner credentials)

### Architecture decisions
- [ ] Write an ADR for the wizard → AI → scraper → filter → results pipeline (see [04 — System Flow](../product/04-system-flow-and-architecture.md))
- [ ] Define the **wizard payload schema** (the structured object the frontend sends to the backend)
- [ ] Define the **query intent schema** (search term, category hint, relevance rationale, constraint tags)
- [ ] Define the **product result schema** (image, title, price, currency, partner, affiliate URL, rationale)
- [ ] Decide session-persistence mechanism for wizard state (e.g., local/session storage) — no accounts in MVP

### Partners & legal
- [ ] Identify initial partner list (Digikala, Snapshop, others) and their affiliate programs
- [ ] Register for affiliate programs and obtain tracking link format per partner
- [ ] Legal review per partner: scraping ToS, rate limits, official API availability vs. scraping
- [ ] Document per-partner decision: API, scraping, or excluded from MVP
- [ ] Confirm local currency handling and the "sane minimum budget floor" value for Step 5

### Design foundations
- [ ] Establish a minimal design system (colors, typography, chip component, buttons, progress indicator)
- [ ] Draft low-fidelity wireframes for wizard, waiting room, and results page
- [ ] Write the initial copy deck (step titles, chip labels, positive framing for Step 4, CTA text)

## Done when

- A new contributor can clone, install, and run the project locally in under 15 minutes
- Payload, query-intent, and product-result schemas are documented and agreed
- Every MVP partner has a documented legal/technical integration decision
