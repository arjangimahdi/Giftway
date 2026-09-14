import type { ButtonHTMLAttributes } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

// Multi-select wizard answers. Selected is a tint, not a fill, to match the
// outlined button language.
export const chipVariants = tv({
  base: 'inline-flex cursor-pointer items-center justify-center border font-sans leading-none transition-colors select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:cursor-not-allowed disabled:opacity-45',
  variants: {
    shape: {
      pill: 'rounded-full px-5 py-3 text-sm',
      tile: 'rounded-lg px-5 py-4 text-lg',
    },
    selected: {
      true: 'border-primary-500 bg-primary-100 text-primary-800',
      false:
        'border-border bg-transparent text-foreground hover:border-primary-500',
    },
  },
  defaultVariants: { shape: 'pill', selected: false },
});

export type ChipProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onToggle'
> &
  VariantProps<typeof chipVariants> & { onToggle?: () => void };

export function Chip({
  shape,
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
      className={chipVariants({ shape, selected, className })}
      {...props}
    />
  );
}

export default Chip;
