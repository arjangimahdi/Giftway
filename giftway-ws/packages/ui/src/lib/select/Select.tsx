import {
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { tv } from 'tailwind-variants';
import { inputVariants } from '../input/Input';

// A custom listbox rather than a native <select>, so the open list is styled
// like the rest of the system. ARIA combobox pattern: the trigger owns focus
// and keyboard handling; the list is presentational.
export const selectVariants = tv({
  slots: {
    root: 'relative block w-full',
    trigger: '',
    value: 'flex-1 truncate text-left',
    placeholder: 'text-muted',
    chevron: 'size-4 shrink-0 text-muted transition-transform',
    list: 'absolute inset-x-0 top-full z-20 mt-1 max-h-64 overflow-auto rounded-md border border-border bg-surface-raised p-1 shadow-lg focus:outline-none',
    option:
      'flex cursor-pointer items-center justify-between gap-2 rounded-sm px-2 py-2 text-sm text-foreground',
    check: 'size-4 shrink-0 text-primary-500',
  },
  variants: {
    open: {
      true: { chevron: 'rotate-180' },
    },
    active: {
      true: { option: 'bg-foreground/7' },
    },
    selected: {
      true: { option: 'text-primary-500' },
    },
    disabled: {
      true: { option: 'cursor-not-allowed opacity-45' },
    },
  },
});

const triggerVariants = tv({
  extend: inputVariants,
  base: 'flex cursor-pointer items-center gap-2 pr-2 aria-expanded:border-primary-500',
});

export type SelectOption<T extends string> = {
  value: T;
  label: ReactNode;
  disabled?: boolean;
};

export type SelectProps<T extends string> = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> & {
  options: SelectOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  placeholder?: ReactNode;
  /** Adds a hidden input so the value submits with a form. */
  name?: string;
  disabled?: boolean;
  invalid?: boolean;
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
};

export function Select<T extends string>({
  options,
  value,
  onChange,
  placeholder = 'Select…',
  name,
  disabled,
  invalid,
  id,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...props
}: SelectProps<T>) {
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const selectedIndex = options.findIndex((o) => o.value === value);
  const [activeIndex, setActiveIndex] = useState(selectedIndex);

  const styles = selectVariants({ open });
  const selected = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  const openList = () => {
    if (disabled) return;
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : nextEnabled(-1, 1));
    setOpen(true);
  };

  const nextEnabled = (from: number, step: 1 | -1) => {
    let i = from;
    for (let n = 0; n < options.length; n++) {
      i = (i + step + options.length) % options.length;
      if (!options[i].disabled) return i;
    }
    return from;
  };

  const commit = (index: number) => {
    const option = options[index];
    if (!option || option.disabled) return;
    onChange(option.value);
    setOpen(false);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((i) => nextEnabled(i, 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((i) => nextEnabled(i, -1));
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(nextEnabled(-1, 1));
        break;
      case 'End':
        e.preventDefault();
        setActiveIndex(nextEnabled(0, -1));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        commit(activeIndex);
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        break;
      case 'Tab':
        setOpen(false);
        break;
    }
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className={styles.root({ className })} {...props}>
      <button
        type="button"
        id={id}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-activedescendant={
          open && activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined
        }
        aria-invalid={invalid || undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        disabled={disabled}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={triggerVariants({ invalid })}
      >
        <span className={styles.value()}>
          {selected ? (
            selected.label
          ) : (
            <span className={styles.placeholder()}>{placeholder}</span>
          )}
        </span>
        <Chevron className={styles.chevron()} />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={ariaLabelledBy}
          className={styles.list()}
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === selectedIndex}
              aria-disabled={option.disabled || undefined}
              onPointerMove={() => {
                if (!option.disabled) setActiveIndex(index);
              }}
              onClick={() => commit(index)}
              className={selectVariants({
                active: index === activeIndex,
                selected: index === selectedIndex,
                disabled: option.disabled,
              }).option()}
            >
              {option.label}
              {index === selectedIndex && <Check className={styles.check()} />}
            </li>
          ))}
        </ul>
      )}

      {name && <input type="hidden" name={name} value={value ?? ''} />}
    </div>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

function Check({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}

export default Select;
