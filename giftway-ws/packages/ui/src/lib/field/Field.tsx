import { cloneElement, isValidElement, useId, type ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

export const fieldVariants = tv({
  slots: {
    root: 'flex flex-col gap-1',
    label: 'text-xs text-muted',
    message: 'text-xs',
  },
  variants: {
    invalid: {
      true: { message: 'text-danger-500' },
      false: { message: 'text-muted' },
    },
  },
  defaultVariants: { invalid: false },
});

export type FieldProps = VariantProps<typeof fieldVariants> & {
  label: ReactNode;
  /** Help text, or the error message when `invalid`. */
  message?: ReactNode;
  className?: string;
  /** A single Input / TextArea / Select; it receives `id`, `invalid` and `aria-describedby`. */
  children: ReactNode;
};

export function Field({
  label,
  message,
  invalid,
  className,
  children,
}: FieldProps) {
  const generatedId = useId();
  const child = isValidElement<Record<string, unknown>>(children)
    ? children
    : null;
  const controlId =
    typeof child?.props.id === 'string' ? child.props.id : generatedId;
  const messageId = message ? `${controlId}-message` : undefined;
  const styles = fieldVariants({ invalid });

  const control = child
    ? cloneElement(child, {
        id: controlId,
        invalid: child.props.invalid ?? invalid,
        'aria-describedby': child.props['aria-describedby'] ?? messageId,
      })
    : children;

  return (
    <div className={styles.root({ className })}>
      <label htmlFor={controlId} className={styles.label()}>
        {label}
      </label>
      {control}
      {message && (
        <p id={messageId} className={styles.message()}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Field;
