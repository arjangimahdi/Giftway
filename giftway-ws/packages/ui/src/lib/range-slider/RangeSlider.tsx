'use client';

import { useId, type HTMLAttributes } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

// Two native range inputs stacked over one track. The inputs are transparent
// and only their thumbs take pointer events, so either handle can be grabbed
// wherever it sits.
const thumb =
  '[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-primary-300 [&::-webkit-slider-thumb]:bg-primary-500 [&::-webkit-slider-thumb]:ring-4 [&::-webkit-slider-thumb]:ring-primary-500/16 [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-6 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border [&::-moz-range-thumb]:border-primary-300 [&::-moz-range-thumb]:bg-primary-500 [&::-moz-range-thumb]:ring-4 [&::-moz-range-thumb]:ring-primary-500/16';

export const rangeSliderVariants = tv({
  slots: {
    root: 'flex flex-col gap-4',
    header: 'flex items-baseline justify-between gap-4',
    label: 'font-mono text-xs tracking-widest text-muted uppercase',
    value: 'font-sans text-xl font-medium tracking-tight text-foreground',
    track: 'relative h-4 rounded-md border border-border bg-surface',
    span: 'absolute inset-y-0 rounded-md bg-linear-to-r from-primary-700 to-primary-500',
    input: `pointer-events-none absolute inset-x-0 top-1/2 h-6 w-full -translate-y-1/2 cursor-pointer appearance-none bg-transparent focus-visible:outline-none disabled:cursor-not-allowed ${thumb}`,
  },
});

export type RangeSliderProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> &
  VariantProps<typeof rangeSliderVariants> & {
    label: string;
    min: number;
    max: number;
    step?: number;
    /** `[low, high]`; the component keeps low ≤ high. */
    value: [number, number];
    onChange: (value: [number, number]) => void;
    formatValue?: (value: number) => string;
    disabled?: boolean;
  };

export function RangeSlider({
  label,
  min,
  max,
  step = 1,
  value: [low, high],
  onChange,
  formatValue = String,
  disabled,
  className,
  ...props
}: RangeSliderProps) {
  const id = useId();
  const styles = rangeSliderVariants();
  const range = max - min || 1;
  const left = ((low - min) / range) * 100;
  const width = (Math.max(0, high - low) / range) * 100;

  return (
    <div className={styles.root({ className })} {...props}>
      <div className={styles.header()}>
        <span id={id} className={styles.label()}>
          {label}
        </span>
        <output className={styles.value()} aria-live="polite">
          {formatValue(low)} – {formatValue(high)}
        </output>
      </div>
      <div className={styles.track()}>
        <div
          aria-hidden="true"
          className={styles.span()}
          style={{ left: `${left}%`, width: `${width}%` }}
        />
        <input
          type="range"
          aria-labelledby={id}
          aria-label="Minimum"
          min={min}
          max={max}
          step={step}
          value={low}
          disabled={disabled}
          onChange={(e) => {
            const next = Number(e.target.value);
            onChange([next, Math.max(next, high)]);
          }}
          className={styles.input()}
        />
        <input
          type="range"
          aria-labelledby={id}
          aria-label="Maximum"
          min={min}
          max={max}
          step={step}
          value={high}
          disabled={disabled}
          onChange={(e) => {
            const next = Number(e.target.value);
            onChange([Math.min(next, low), next]);
          }}
          className={styles.input()}
        />
      </div>
    </div>
  );
}

export default RangeSlider;
