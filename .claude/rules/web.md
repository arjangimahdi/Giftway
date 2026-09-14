---
paths:
  - 'giftway-ws/apps/web/**'
---

# web — React 19 + Vite + Tailwind v4

## Layout

```
apps/web/src/
  main.tsx                 BrowserRouter + App
  styles.css               @import tailwindcss + @giftway-ws/tokens/theme.css — the only global CSS
  app/app.tsx              <Routes> only
  app/pages/<Name>Page.tsx one component per route
  app/wizard/              wizard shell, step components, store, validation
  app/results/             waiting room + results + edge states
  lib/                     api client, copy/labels, small helpers
```

Routes: `/` landing · `/wizard/1`…`/wizard/5` · `/results` (the waiting room is a _state_ of `/results`, so a refresh re-submits instead of losing the request).

## Conventions

- Compose from `@giftway-ws/ui` first. Only build a local component when it is app-specific (e.g. a wizard step). If something is reusable, it belongs in `packages/ui` with a story.
- Styling is Tailwind utilities backed by tokens (`bg-surface`, `text-foreground`, `text-muted`, `border-border`, `bg-primary-500`, `rounded-md`, `font-mono`). No raw hex, no `px` literals, no inline `style=` for theming.
- `styles.css` already has `@source '../../../packages/ui/src'` so ui classes are scanned — keep it if you touch that file.
- Calls to the API go through `src/lib/api.ts` using `import.meta.env.VITE_API_URL` (default `http://localhost:3333`). Don't scatter `fetch` calls in components.
- Progress from `POST /recommend` is consumed with `EventSource`/streamed fetch and mapped to waiting-room stages; stage durations have min/max clamps so a fast or slow backend never looks janky.

## Wizard rules (from `documents/product/03-wizard-specification.md`)

- One step visible at a time, persistent `03/05` style progress label.
- Every step: chip group(s) **and** an always-visible free-text field. Chips are multi-select unless noted.
- Validation per step: 1–3 need ≥1 chip or free text; 2's vibe is optional; 4 is fully optional (has `skip →`, styled as ghost, never a primary path); 5 needs `min ≥ floor`, `max ≥ min`, CTA disabled until valid.
- Step 4 "Already has" chips are derived from Step 3 selections; hide the group when empty.
- Selecting a budget preset fills min/max; editing min/max deselects the preset.
- State lives in one store persisted to `localStorage`; going back never clears later steps; refresh restores everything. `Refine my answers` returns to `/wizard/1` with state intact; `Start over` clears it.
- Chip IDs come from the shared constants; user-facing labels live in `src/lib/copy.ts` and follow `documents/design/copy-deck.md`.

## Accessibility

- Chips: `<button role="checkbox" aria-checked>`; groups in `<fieldset>` with a `<legend>`.
- Inputs have labels. Focus moves to the step title on step change. Respect `prefers-reduced-motion` in the waiting room (updates still visibly change).
- Keyboard-only completion of the whole wizard must work.

## Testing

- Store and validation logic: plain Vitest unit tests (`*.spec.ts`), jsdom env for anything touching `localStorage`.
- Components: `@testing-library/react`. Test behavior (gating, back-nav preservation), not markup.
- For UI changes, run the app and look at it; type-checking is not verification.
