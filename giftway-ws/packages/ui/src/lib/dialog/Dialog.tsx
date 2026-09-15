'use client';

import { useEffect, useId, type HTMLAttributes, type ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

export const dialogVariants = tv({
  slots: {
    backdrop:
      'fixed inset-0 z-40 grid place-items-center bg-neutral-900/70 p-4',
    panel:
      'flex w-full max-w-md flex-col gap-3 rounded-lg border border-border bg-surface-raised p-6 shadow-lg',
    title: 'font-sans text-xl font-medium tracking-tight text-foreground',
    body: 'text-sm leading-relaxed text-neutral-600',
    actions: 'flex justify-end gap-3 pt-2',
  },
});

const styles = dialogVariants();

export type DialogProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> &
  VariantProps<typeof dialogVariants> & {
    open: boolean;
    /** Called on Escape, backdrop click, or by an action inside. */
    onClose: () => void;
    title: ReactNode;
    children?: ReactNode;
    actions?: ReactNode;
  };

export function Dialog({
  open,
  onClose,
  title,
  children,
  actions,
  className,
  ...props
}: DialogProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.backdrop()} onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={styles.panel({ className })}
        {...props}
        onClick={(e) => {
          e.stopPropagation();
          props.onClick?.(e);
        }}
      >
        <h2 id={titleId} className={styles.title()}>
          {title}
        </h2>
        {children && <div className={styles.body()}>{children}</div>}
        {actions && <div className={styles.actions()}>{actions}</div>}
      </div>
    </div>
  );
}

export default Dialog;
