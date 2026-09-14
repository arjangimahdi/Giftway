import type { HTMLAttributes } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

export const cardVariants = tv({
  slots: {
    root: 'flex flex-col gap-3 rounded-lg bg-surface-raised font-sans text-neutral-700',
    title: 'text-lg font-semibold leading-tight text-neutral-900',
    body: 'text-sm leading-normal text-muted',
    footer: 'flex items-center gap-2 pt-2',
  },
  variants: {
    padding: {
      sm: { root: 'p-4' },
      md: { root: 'p-6' },
    },
    elevated: {
      true: { root: 'shadow-md' },
      false: { root: 'border border-border' },
    },
  },
  defaultVariants: {
    padding: 'md',
    elevated: false,
  },
});

type CardSlotProps = HTMLAttributes<HTMLDivElement>;

export type CardProps = CardSlotProps & VariantProps<typeof cardVariants>;

export function Card({ padding, elevated, className, ...props }: CardProps) {
  const { root } = cardVariants({ padding, elevated });

  return <div className={root({ className })} {...props} />;
}

export function CardTitle({ className, ...props }: CardSlotProps) {
  const { title } = cardVariants();

  return <h3 className={title({ className })} {...props} />;
}

export function CardBody({ className, ...props }: CardSlotProps) {
  const { body } = cardVariants();

  return <p className={body({ className })} {...props} />;
}

export function CardFooter({ className, ...props }: CardSlotProps) {
  const { footer } = cardVariants();

  return <div className={footer({ className })} {...props} />;
}
