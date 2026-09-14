---
paths:
  - 'packages/ui/**'
---

# ui — shared components

## One component = one folder

```
packages/ui/src/lib/<name>/
  <Name>.tsx          component + `<name>Variants = tv({...})` + `<Name>Props`
  <Name>.stories.tsx  Storybook: one story per meaningful variant, `satisfies Meta<typeof X>`
  <Name>.spec.tsx     optional; behavior only
```

Then export from `packages/ui/src/index.ts`: the component, its `Variants`, and its `Props` type. Nothing is public unless it is in `index.ts`.

## Pattern (see `lib/button/Button.tsx`)

- `tailwind-variants` `tv()` with `base`, `variants`, `defaultVariants`. Props = intrinsic element props `&` `VariantProps<typeof xVariants>`.
- Accept `className` and pass it into `xVariants({ ..., className })` so consumers can extend.
- Default `type="button"` on buttons. Spread `...props` last.
- Named export **and** default export, matching existing components.

## Styling

- Token-backed Tailwind classes only: `bg-primary-500`, `text-neutral-900`, `border-border`, `bg-surface-raised`, `rounded-md`, `text-sm`, `font-mono`. No hex, no arbitrary values like `[#9184d9]` or `[13px]` — if a value is missing, add it to `packages/tokens` first.
- Focus styles: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500`.
- Components must look right in both themes; don't hardcode "white" for text on the accent — use the token that inverts.

## Scope

- `ui` knows nothing about gifts, wizards, or the API. It exports primitives: Button, Badge, Card, Chip, ProgressLabel, Input/Textarea, Logo, etc. Wizard steps and result cards are composed in `apps/web`.
- No data fetching, no router, no global state in this package.
- Peer deps only: `react`, `react-dom`. Don't add runtime dependencies without a reason worth a sentence in the PR.

## Verify

`npx nx storybook ui` and look at every story you added or changed; then `npx nx run-many -t lint typecheck test build -p ui`.
