import { act, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { vi } from 'vitest';
import { Chip } from './Chip';

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

function render(element: ReactElement) {
  act(() => root.render(element));
  return container.querySelector('button') as HTMLButtonElement;
}

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('Chip', () => {
  it('is a non-submitting button exposed as a checkbox', () => {
    const chip = render(<Chip>Cooking</Chip>);
    expect(chip.type).toBe('button');
    expect(chip.getAttribute('role')).toBe('checkbox');
    expect(chip.textContent).toBe('Cooking');
  });

  it('mirrors selected in aria-checked', () => {
    expect(render(<Chip>Cooking</Chip>).getAttribute('aria-checked')).toBe(
      'false',
    );
    expect(
      render(<Chip selected>Cooking</Chip>).getAttribute('aria-checked'),
    ).toBe('true');
  });

  it('calls onToggle on click', () => {
    const onToggle = vi.fn();
    const chip = render(<Chip onToggle={onToggle}>Cooking</Chip>);
    act(() => chip.click());
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('does not toggle while disabled', () => {
    const onToggle = vi.fn();
    const chip = render(
      <Chip disabled onToggle={onToggle}>
        Cooking
      </Chip>,
    );
    expect(chip.disabled).toBe(true);
    act(() => chip.click());
    expect(onToggle).not.toHaveBeenCalled();
  });

  it('merges a consumer className', () => {
    expect(
      render(<Chip className="m-1">Cooking</Chip>).classList.contains('m-1'),
    ).toBe(true);
  });
});
