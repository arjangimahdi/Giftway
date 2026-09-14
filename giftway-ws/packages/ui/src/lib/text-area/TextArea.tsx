import type { TextareaHTMLAttributes } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';
import { inputVariants } from '../input/Input';

export const textAreaVariants = tv({
  extend: inputVariants,
  base: 'min-h-24 resize-y py-2 leading-normal',
});

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> &
  VariantProps<typeof textAreaVariants>;

export function TextArea({ invalid, className, ...props }: TextAreaProps) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={textAreaVariants({ invalid, className })}
      {...props}
    />
  );
}

export default TextArea;
