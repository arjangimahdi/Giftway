---
name: design-tokens
description: Change colors, spacing, radius, or typography in packages/tokens and regenerate the Tailwind theme. Use when a style value is missing, when adjusting the brand palette, or when a component needs a value that isn't a token yet.
---

# Working with design tokens

Tokens are the only place brand values live. `ui` and `web` consume them as Tailwind utilities; nothing else hardcodes a color, size, or font.

## Change a value

1. Edit `packages/tokens/tokens/{color,spacing,radius,typography}.json` (DTCG: `{ "$type": "...", "$value": "..." }`; reference other tokens as `"{color.neutral.50}"`).
2. `npx nx run tokens:generate`
3. Read the diff of `packages/tokens/src/generated/theme.css` — it should contain only the variables you meant to change.
4. `npx nx run-many -t build -p ui web` to confirm consumers still compile, then eyeball Storybook or the app.
5. Commit the JSON **and** the generated files together.

## Mapping cheat-sheet

| JSON path              | CSS var                  | Tailwind                                                   |
| ---------------------- | ------------------------ | ---------------------------------------------------------- |
| `color.primary.500`    | `--color-primary-500`    | `bg-primary-500`, `text-primary-500`, `border-primary-500` |
| `color.surface`        | `--color-surface`        | `bg-surface`                                               |
| `font.family.mono`     | `--font-mono`            | `font-mono`                                                |
| `font.size.sm`         | `--text-sm`              | `text-sm`                                                  |
| `font.weight.semibold` | `--font-weight-semibold` | `font-semibold`                                            |
| `font.leading.tight`   | `--leading-tight`        | `leading-tight`                                            |
| `spacing.4`            | `--spacing-4`            | `p-4`, `gap-4`                                             |
| `radius.md`            | `--radius-md`            | `rounded-md`                                               |

The `@theme` block resets each namespace (`--color-*: initial` etc.) before declaring, so Tailwind's defaults for those namespaces are **replaced**, not extended. If a default utility you expected is missing, it needs a token.

## Brand reference ("Tagged")

Accent `primary-500 #9184d9`, deep accent `primary-700 #5d5294`. Light theme ground `neutral-50 #f3f5fe`, ink `neutral-800 #292b31`, border `neutral-200 #cfd3e5`, muted `neutral-500 #75798c`. Dark theme ground `neutral-900 #161826`, ink `#e9e9ed`. Radii: `sm 4px`, `md 8px`, `lg 14px`, pills `9999px`. Type: Inter (sans), IBM Plex Mono (mono) for labels, prices, progress. Semantic aliases (`surface`, `foreground`, `muted`, `border`) are what a dark theme should flip — add dark variants at the alias level when theming lands.
