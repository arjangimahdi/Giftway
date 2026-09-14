import type { ButtonHTMLAttributes } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

// Design system: buttons are outlined, never filled. Hover/pressed states are
// translucent tints of the variant's own color, so they hold up on any ground.
export const buttonVariants = tv({
  base: 'inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border border-transparent bg-transparent font-sans font-medium leading-tight text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 disabled:cursor-not-allowed disabled:opacity-45',
  variants: {
    variant: {
      primary:
        'border-primary-500 text-primary-500 hover:bg-primary-500/12 active:bg-primary-500/22',
      secondary: 'border-border hover:bg-foreground/7 active:bg-foreground/14',
      ghost:
        'text-primary-500 hover:bg-primary-500/10 active:bg-primary-500/18',
    },
    size: {
      sm: 'h-8 px-3 text-xs',
      md: 'h-9 px-4 text-sm',
      lg: 'h-12 px-6 text-md',
    },
    block: {
      true: 'w-full',
    },
  },
  compoundVariants: [
    { variant: 'ghost', size: ['sm', 'md', 'lg'], class: 'px-1' },
  ],
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
  block,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariants({ variant, size, block, className })}
      {...props}
    />
  );
}

export default Button;
