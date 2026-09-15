---
paths:
  - "giftway-ws/apps/web/**"
---

# web — React 19 + Next.js 16 (App Router) + Tailwind v4

## Layout

```
apps/web/src/app/
  layout.tsx               root layout: <html lang>, <main>, site-wide `metadata` + `viewport`
  globals.css              @import tailwindcss + @giftway-ws/tokens/theme.css — the only global CSS
  page.tsx                 /
  about/page.tsx           /about
  wizard/[step]/page.tsx   /wizard/1 … /wizard/5 (planned)
  results/page.tsx         /results (planned; the waiting room is a _state_ of this route)
  robots.ts, sitemap.ts    SEO routes
apps/web/src/
  components/              app-specific composition (wizard steps, result cards, waiting room)
  lib/                     api client, copy/labels, store, validation, small helpers
```

Routes follow the App Router file convention: a folder + `page.tsx`, never a `pages/` directory or a client-side router.

## Server vs client

- Every file is a **server component by default**. Add `'use client';` only to leaves that need state, effects, refs, event handlers, or browser APIs (`localStorage`, `EventSource`). Keep the boundary as low in the tree as possible so `page.tsx` files stay server-rendered — that is the whole point of using Next.
- Every route exports `metadata` (title at minimum). The root layout owns `metadataBase`, the title template, description, and Open Graph defaults.
- Navigation: `next/link` for links, `useRouter`/`usePathname` from `next/navigation` inside client components. Never `window.location` for in-app moves.
- Env: browser-visible values are `process.env.NEXT_PUBLIC_*` and are inlined at build time (`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`). Secrets stay server-side and never get the `NEXT_PUBLIC_` prefix.

## Conventions

- Compose from `@giftway-ws/ui` first. Only build a local component when it is app-specific (e.g. a wizard step). If something is reusable, it belongs in `packages/ui` with a story.
- Styling is Tailwind utilities backed by tokens (`bg-surface`, `text-foreground`, `text-muted`, `border-border`, `bg-primary-500`, `rounded-md`, `font-mono`). No raw hex, no `px` literals, no inline `style=` for theming.
- `globals.css` has `@source '../../../../packages/ui/src'` so ui classes are scanned — keep it (and its depth) if you touch that file. Tailwind runs through `@tailwindcss/postcss` (`postcss.config.mjs`), not a Vite plugin.
- Calls to the API go through `src/lib/api.ts` using `process.env.NEXT_PUBLIC_API_URL` (default `http://localhost:3333`). Don't scatter `fetch` calls in components.
- Progress from `POST /recommend` is consumed with `EventSource`/streamed fetch in a client component and mapped to waiting-room stages; stage durations have min/max clamps so a fast or slow backend never looks janky.
- `next.config.js` keeps `transpilePackages` for `@giftway-ws/ui` and `@giftway-ws/tokens` (they export raw TS) and `output: 'standalone'` for Docker. `tsconfig.json` is references-only and managed by `nx sync`; Next reads `tsconfig.app.json`.

## Wizard rules (from `documents/product/03-wizard-specification.md`)

- One step visible at a time, persistent `03/05` style progress label.
- Every step: chip group(s) **and** an always-visible free-text field. Chips are multi-select unless noted.
- Validation per step: 1–3 need ≥1 chip or free text; 2's vibe is optional; 4 is fully optional (has `skip →`, styled as ghost, never a primary path); 5 needs `min ≥ floor`, `max ≥ min`, CTA disabled until valid.
- Step 4 "Already has" chips are derived from Step 3 selections; hide the group when empty.
- Selecting a budget preset fills min/max; editing min/max deselects the preset.
- State lives in one store persisted to `localStorage` (client component only; read storage in an effect, never during render, so SSR and hydration agree). Going back never clears later steps; refresh restores everything. `Refine my answers` returns to `/wizard/1` with state intact; `Start over` clears it.
- Chip IDs come from the shared constants; user-facing labels live in `src/lib/copy.ts` and follow `documents/design/copy-deck.md`.

## Accessibility

- Chips: `<button role="checkbox" aria-checked>`; groups in `<fieldset>` with a `<legend>`.
- Inputs have labels. Focus moves to the step title on step change. Respect `prefers-reduced-motion` in the waiting room (updates still visibly change).
- Keyboard-only completion of the whole wizard must work.

## Testing

- Store and validation logic: plain Vitest unit tests (`*.spec.ts`), jsdom env for anything touching `localStorage`.
- Components: `@testing-library/react`. Test behavior (gating, back-nav preservation), not markup. Client components that use `next/navigation` need `vi.mock('next/navigation')`.
- For UI changes, run the app (`npx nx serve web`) and look at it; type-checking is not verification. `curl` the route to confirm it is server-rendered when SEO matters.
