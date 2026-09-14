import type { InputHTMLAttributes, ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

// The native input stays in the tree (keyboard + forms) but is visually
// hidden; the dot after it paints the state via peer-* variants.
export const radioVariants = tv({
  slots: {
    root: 'inline-flex cursor-pointer items-center gap-2 text-sm text-foreground has-disabled:cursor-not-allowed has-disabled:opacity-45',
    input: 'peer sr-only',
    dot: 'size-4 shrink-0 rounded-full border border-border transition-colors peer-hover:border-primary-500 peer-checked:border-primary-500 peer-checked:bg-primary-500 peer-checked:ring-4 peer-checked:ring-surface-raised peer-checked:ring-inset peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary-500',
  },
});

export type RadioProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> &
  VariantProps<typeof radioVariants> & { children?: ReactNode };

export function Radio({ className, children, ...props }: RadioProps) {
  const styles = radioVariants();
  return (
    <label className={styles.root({ className })}>
      <input type="radio" className={styles.input()} {...props} />
      <span aria-hidden="true" className={styles.dot()} />
      {children}
    </label>
  );
}

export default Radio;
