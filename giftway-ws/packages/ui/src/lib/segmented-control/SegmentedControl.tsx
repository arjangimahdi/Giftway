import { useId, type HTMLAttributes, type ReactNode } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

// Two to four short options; radios under the hood so it works in forms and
// with arrow keys for free.
export const segmentedControlVariants = tv({
  slots: {
    root: 'inline-flex overflow-hidden rounded-md border border-border',
    // End options share the container's radius so the selected ring follows
    // the curve instead of being clipped square at the corners.
    option:
      'inline-flex cursor-pointer items-center gap-2 px-3 py-2 text-sm leading-none text-foreground transition-colors first:rounded-l-md last:rounded-r-md not-first:border-l not-first:border-border hover:bg-foreground/7 has-checked:text-primary-500 has-checked:ring-1 has-checked:ring-primary-500 has-checked:ring-inset has-checked:hover:bg-transparent has-focus-visible:outline-2 has-focus-visible:-outline-offset-2 has-focus-visible:outline-primary-500 has-disabled:cursor-not-allowed has-disabled:opacity-45',
    input: 'sr-only',
  },
});

export type SegmentedOption<T extends string> = {
  value: T;
  label: ReactNode;
  disabled?: boolean;
};

export type SegmentedControlProps<T extends string> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> &
  VariantProps<typeof segmentedControlVariants> & {
    options: SegmentedOption<T>[];
    value: T;
    onChange: (value: T) => void;
    /** Radio group name; generated when omitted. */
    name?: string;
    'aria-label'?: string;
  };

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  name,
  className,
  ...props
}: SegmentedControlProps<T>) {
  const generatedName = useId();
  const groupName = name ?? generatedName;
  const styles = segmentedControlVariants();

  return (
    <div role="radiogroup" className={styles.root({ className })} {...props}>
      {options.map((option) => (
        <label key={option.value} className={styles.option()}>
          <input
            type="radio"
            name={groupName}
            value={option.value}
            checked={option.value === value}
            disabled={option.disabled}
            onChange={() => onChange(option.value)}
            className={styles.input()}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
}

export default SegmentedControl;
