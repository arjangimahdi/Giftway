import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { buttonVariants } from '../button/Button';

// Inherits variant styling from Button; only the geometry differs.
export const buttonSquareVariants = tv({
  extend: buttonVariants,
  base: 'aspect-square shrink-0 [&>svg]:shrink-0',
  // px-0 on each size beats Button's horizontal padding (and ghost's px-1).
  variants: {
    size: {
      sm: 'size-8 px-0',
      md: 'size-9 px-0',
      lg: 'size-12 px-0',
    },
  },
  compoundVariants: [
    { variant: 'ghost', size: ['sm', 'md', 'lg'], class: 'px-0' },
  ],
});

export type ButtonSquareProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'children'
> &
  Omit<VariantProps<typeof buttonSquareVariants>, 'block'> & {
    /** Icon-only buttons have no visible text, so a label is mandatory. */
    'aria-label': string;
    icon: ReactNode;
  };

export function ButtonSquare({
  variant,
  size,
  icon,
  className,
  type = 'button',
  ...props
}: ButtonSquareProps) {
  return (
    <button
      type={type}
      className={buttonSquareVariants({ variant, size, className })}
      {...props}
    >
      {icon}
    </button>
  );
}

export default ButtonSquare;
