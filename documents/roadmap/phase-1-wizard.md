# Phase 1 — The 5-Step Wizard

**Status:** ⬜ Not started
**Depends on:** [Phase 0 — Foundation](phase-0-foundation.md)
**References:** [03 — Wizard Specification](../product/03-wizard-specification.md) · [02 — Users & Problem Discovery](../product/02-users-and-problem-discovery.md)

## Goal

Ship the complete 5-step wizard: every step has chips **and** a visible free-text field, per-step validation, back-navigation without data loss, and session-level state persistence. Ends with a "Find Their Perfect Gift" CTA that emits the structured payload defined in Phase 0.

Guiding principle: **Chips lower the floor, free-text raises the ceiling.** A user must be able to finish with zero typing.

## Checklist

### Shared wizard shell
- [ ] Wizard container with one-step-at-a-time progressive disclosure
- [ ] Persistent progress indicator ("Step X of 5")
- [ ] Back / Next navigation; going back never clears later steps' inputs
- [ ] Reusable multi-select chip component (single-select variant where needed)
- [ ] Reusable free-text "Custom/Other" field — always visible, never behind a secondary click
- [ ] Wizard state store (single source of truth for all five steps)
- [ ] Session persistence: state survives an accidental refresh
- [ ] Per-step validation framework driving the Next / CTA enabled state
- [ ] Mobile-responsive layout for all steps

### Step 1 — The Target
- [ ] Age range chips: Kid, Teen, 20s, 30s, 40s, 50+
- [ ] Gender chips: Male, Female, Non-specific
- [ ] Relationship chips: Partner, Parent, Sibling, Friend, Colleague, Boss, In-law
- [ ] Free-text: "Describe them in your own words"
- [ ] Validation: at least one chip OR free-text required

### Step 2 — Occasion & Vibe
- [ ] Occasion chips: Birthday, Anniversary, Wedding, Apology, Graduation, Housewarming, Just Because, Corporate/Work
- [ ] Vibe chips (multi-select, optional): Romantic, Funny/Playful, Formal/Professional, Practical, Luxurious, Sentimental
- [ ] Free-text: "Tell us more about the occasion"
- [ ] Validation: occasion chip OR free-text required

### Step 3 — Interests & Lifestyle
- [ ] Interest chips: Tech & Gadgets, Reading, Outdoor/Adventure, Fashion & Style, Home & Cooking, Gaming, Fitness & Wellness, Art & Creativity, Music, Travel
- [ ] Soft guidance to pick 2–5 chips (non-blocking)
- [ ] Free-text: "Any specific hobbies, brands, or interests?" — can stand alone
- [ ] Validation: chips OR free-text

### Step 4 — Anti-Preferences (crucial)
- [ ] Dislike chips: No Clothes, No Perfume/Scented Items, No Gag Gifts, No Food/Edibles
- [ ] Allergy chips: Nuts, Fragrance, Latex
- [ ] **Dynamic "Already Owns" chips** derived from Step 3 selections (e.g., Gaming → "Already has a PS5", "Already has a Switch")
- [ ] Define the interest → "Already Owns" suggestion mapping for all 10 interests
- [ ] Free-text: "Anything else they hate, are allergic to, or already own?"
- [ ] Positive framing in copy (e.g., "Help us avoid a miss"), not "Restrictions"
- [ ] Step is optional but visually weighted equally with other steps (no "skip"-styled deprioritization)

### Step 5 — Budget
- [ ] Preset range chips (e.g., Under $25, $25–$50, $50–$100, $100+) in local currency
- [ ] Custom min/max numeric inputs always visible alongside chips
- [ ] Selecting a chip populates min/max; editing min/max deselects the chip
- [ ] Validation: min and max required; max ≥ min; currency-aware minimum floor enforced
- [ ] "Find Their Perfect Gift" CTA disabled until validation passes

### Submit
- [ ] CTA packages wizard state into the agreed payload schema
- [ ] Payload sent to backend endpoint (stub acceptable until Phase 2/3 land)
- [ ] Transition to waiting room route (placeholder until Phase 4)

### Quality
- [ ] Unit tests for validation rules on each step
- [ ] Test: back-navigation preserves all later inputs
- [ ] Test: refresh restores wizard state
- [ ] Accessibility pass: keyboard navigation for chips, labels for inputs, focus management between steps

## Done when

- A user can complete the wizard with zero typing, or with free-text only, on every step
- All validation rules from the spec are enforced
- Refreshing mid-wizard restores the exact state
- Submitting produces a payload matching the Phase 0 schema
