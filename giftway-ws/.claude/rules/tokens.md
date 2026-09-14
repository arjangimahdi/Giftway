---
paths:
  - 'packages/tokens/**'
---

# tokens — design tokens

Source of truth: `packages/tokens/tokens/*.json` in DTCG format (`{ "$type", "$value" }`, references as `"{color.neutral.50}"`).

`npx nx run tokens:generate` runs style-dictionary (`style-dictionary.config.mjs`) and writes:

- `src/generated/theme.css` — a Tailwind v4 `@theme` block. Token path → CSS variable: `color.primary.500` → `--color-primary-500` → utility `bg-primary-500`; `font.size.sm` → `--text-sm`; `font.family.mono` → `--font-mono`; `spacing.*`, `radius.*` map directly.
- `src/generated/tokens.ts` — the same values as TS constants for non-CSS use.

Never edit anything under `src/generated/` by hand — a hook blocks it. Edit the JSON, regenerate, and commit both.

## Brand palette ("Tagged")

- `primary` 50→900: `#f5f4ff #e7e5fe #d2cefd #b5abfc #968ae0 #9184d9 #796cbf #5d5294 #423a6a #2b2741` — 500 is the accent, 700 is the accent on light backgrounds.
- `neutral` 50→900: `#f3f5fe #e4e7f5 #cfd3e5 #b2b6ca #9397ab #75798c #595d6c #3f424d #292b31 #161826` — 50 is the light ground, 900 the dark ground.
- Semantic aliases: `surface`, `surface-raised`, `foreground`, `muted`, `border` reference the scales; change the alias, not the consumer, when the theme shifts.
- Fonts: `sans` = Inter, `mono` = IBM Plex Mono.

## Adding a token

1. Add it to the right JSON file under the existing group (new group → new file).
2. Regenerate; check the diff in `theme.css` is only what you intended.
3. Use it via the Tailwind utility in `ui`/`web`; don't reference the CSS variable directly unless there is no utility.
