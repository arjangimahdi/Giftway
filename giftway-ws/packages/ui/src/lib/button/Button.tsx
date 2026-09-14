import type { ButtonHTMLAttributes } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

export const buttonVariants = tv({
  base: 'inline-flex items-center justify-center gap-2 rounded-md font-sans font-medium leading-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  variants: {
    variant: {
      primary: 'bg-primary-500 text-white hover:bg-primary-600',
      secondary:
        'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-border',
      ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100',
      danger: 'bg-danger-500 text-white hover:bg-danger-700',
    },
    size: {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-xl',
      lg: 'h-12 px-6 text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  variant,
  size,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  );
}

export default Button;
