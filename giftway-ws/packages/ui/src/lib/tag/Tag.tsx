import { HTMLAttributes } from 'react';
import { tv, VariantProps } from 'tailwind-variants';

export const tagVariants = tv({
  base: 'inline-flex items-center justify-center rounded-sm border border-transparent px-2 py-1 text-xs leading-tight tracking-wide',
  variants: {
    variant: {
      primary: 'bg-primary-800 text-primary-100',
      secondary: 'bg-neutral-800 text-neutral-100',
      'primary-light': 'bg-primary-100 text-primary-700',
      outline: 'border-primary-500 text-primary-500',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export type TagProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof tagVariants>;

export function Tag({ className, variant, ...props }: TagProps) {
  return <span className={tagVariants({ className, variant })} {...props} />;
}

export default Tag;
