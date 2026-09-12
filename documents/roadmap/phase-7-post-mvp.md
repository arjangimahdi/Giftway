# Phase 7 — Post-MVP Roadmap

**Status:** ⬜ Not started
**Depends on:** [Phase 6 — Analytics & Launch](phase-6-analytics-and-launch.md) — MVP KPIs collected and reviewed
**References:** [07 — Scope](../product/07-scope.md) · [09 — Risks & Open Questions](../product/09-risks-and-open-questions.md)

## Goal

Extend Giftway beyond the single-session recommendation loop, in rough priority order and gated on MVP learnings. Sequence is a starting hypothesis; re-order based on what the data says (especially the cost of session-only state on re-engagement).

## Checklist

### 7.0 Gate
- [ ] MVP KPI review completed; core loop validated (Affiliate CTR and Completion Rate at or trending toward targets)
- [ ] Decide whether user accounts are justified (prerequisite for 7.1, 7.4, 7.5)
- [ ] Re-prioritize the features below based on MVP data

### 7.1 User Accounts & Saved Recipients
*(Prerequisite for calendar, alerts, and B2B)*
- [ ] Authentication (email / social login)
- [ ] Saved recipient profiles (wizard inputs persisted per person)
- [ ] Recommendation history per session/recipient
- [ ] Resume an abandoned wizard across visits

### 7.2 Smart Event Calendar
- [ ] Birthdays/anniversaries tied to saved recipients
- [ ] Reminder notifications (email/push) with lead time settings
- [ ] Reminder deep-links into a pre-filled wizard for that recipient
- [ ] Measure: repeat usage rate driven by reminders

### 7.3 Group Gifting
- [ ] Create a group gift for a recommended product and invite contributors
- [ ] Contribution tracking (split amounts, progress toward goal)
- [ ] Invitation flow that drives new-user acquisition (virality metric)
- [ ] Decide payment handling model (still affiliate-only vs. collecting contributions) — legal review

### 7.4 AI-Generated Greeting Cards
- [ ] Generate a personalized card message from wizard inputs + chosen gift
- [ ] Editable message with tone options (matches Step 2 vibe chips)
- [ ] Shareable/printable card output
- [ ] Evaluate as engagement add-on and possible monetization

### 7.5 Price Drop Alerts
- [ ] Watch previously recommended products for price changes
- [ ] Notification on price drop with affiliate link
- [ ] Measure: re-engagement and secondary affiliate revenue

### 7.6 B2B Corporate Gifting
- [ ] Bulk recommendation flow (many recipients, shared budget/occasion)
- [ ] Recipient list import
- [ ] Team/organization accounts and roles
- [ ] Separate pricing/revenue model exploration (beyond consumer affiliate)

### Deferred / Revisit
- [ ] Vision API (image-based search: "upload a photo of their room/style") — revisit only if demand signal appears post-validation
- [ ] Free-form chat mode as an alternative to the wizard — only if wizard drop-off data suggests it

## Done when

Each sub-feature is scoped into its own document with its own checklist once prioritized; this phase is "done" when the post-MVP backlog has been re-ordered from data and the first sub-feature has shipped.
