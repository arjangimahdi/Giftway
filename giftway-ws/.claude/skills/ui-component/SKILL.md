---
name: ui-component
description: Add or change a shared React component in packages/ui using the tailwind-variants pattern, with a Storybook story and index export. Use whenever a reusable UI primitive (chip, input, card, badge, etc.) is needed.
---

# Adding a component to `packages/ui`

Reference implementation: `packages/ui/src/lib/button/Button.tsx` + `Button.stories.tsx`.

## Steps

1. **Check it belongs here.** Reusable, knows nothing about gifts/wizard/API → `ui`. App-specific composition → `apps/web`.
2. **Create the folder** `packages/ui/src/lib/<name>/` with:
   - `<Name>.tsx`
   - `<Name>.stories.tsx`
   - `<Name>.spec.tsx` only if there is behavior worth testing (a toggle, keyboard handling) — pure styling needs no test.
3. **Write the component:**

   ```tsx
   import type { ButtonHTMLAttributes } from 'react';
   import { tv, type VariantProps } from 'tailwind-variants';

   export const chipVariants = tv({
     base: 'inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
     variants: {
       selected: {
         true: 'border-primary-500 bg-primary-500 text-neutral-900',
         false:
           'border-border bg-surface-raised text-foreground hover:border-primary-500',
       },
     },
     defaultVariants: { selected: false },
   });

   export type ChipProps = Omit<
     ButtonHTMLAttributes<HTMLButtonElement>,
     'onToggle'
   > &
     VariantProps<typeof chipVariants> & { onToggle?: () => void };

   export function Chip({
     selected,
     className,
     onToggle,
     ...props
   }: ChipProps) {
     return (
       <button
         type="button"
         role="checkbox"
         aria-checked={!!selected}
         onClick={onToggle}
         className={chipVariants({ selected, className })}
         {...props}
       />
     );
   }

   export default Chip;
   ```

   Rules: token-backed classes only; accept `className`; spread `...props` last; named + default export.

4. **Story** — `title: 'Components/<Name>'`, `satisfies Meta<typeof X>`, one exported story per variant that matters, `argTypes` with `select` controls for enum-like props.
5. **Export** from `packages/ui/src/index.ts`: component, `xVariants`, `XProps`.
6. **Verify:** `npx nx storybook ui` and look at it in both light and dark; then `npx nx run-many -t lint typecheck test build -p ui`.
7. If `apps/web` should use it, import from `@giftway-ws/ui` — never by relative path into the package.

## Giftway primitives expected in `ui`

Button · Badge · Card · Chip (pill, `role="checkbox"`) · ProgressLabel (`03/05 · INTERESTS`, mono, uppercase, letter-spacing) · TextField / TextArea · Logo (rounded tag with "G" + wordmark) · ThemeToggle. Check `index.ts` before creating one that exists.
