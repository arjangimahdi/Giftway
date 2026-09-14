import type { InputHTMLAttributes } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

// Shared by Input, TextArea and Select: a native field on the divider border;
// the accent appears only on focus, danger only when invalid.
export const inputVariants = tv({
  base: 'w-full min-h-9 rounded-md border border-border bg-surface-raised px-3 py-1 font-sans text-sm text-foreground caret-primary-500 transition-colors placeholder:text-muted hover:border-neutral-400 focus-visible:border-primary-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:border-border',
  variants: {
    invalid: {
      true: 'border-danger-500 hover:border-danger-500 focus-visible:border-danger-500',
    },
  },
});

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants>;

export function Input({ invalid, className, ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={inputVariants({ invalid, className })}
      {...props}
    />
  );
}

export default Input;
