import type { HTMLAttributes } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

export const badgeVariants = tv({
  base: 'inline-flex items-center rounded-full font-sans font-medium leading-tight',
  variants: {
    tone: {
      neutral: 'bg-neutral-100 text-neutral-700',
      primary: 'bg-primary-100 text-primary-700',
      success: 'bg-success-100 text-success-700',
      danger: 'bg-danger-100 text-danger-700',
    },
    size: {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1 text-sm',
    },
  },
  defaultVariants: {
    tone: 'neutral',
    size: 'sm',
  },
});

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ tone, size, className, ...props }: BadgeProps) {
  return (
    <span className={badgeVariants({ tone, size, className })} {...props} />
  );
}

export default Badge;
