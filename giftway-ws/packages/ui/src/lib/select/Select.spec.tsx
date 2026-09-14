import { act, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { vi } from 'vitest';
import { Select } from './Select';

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

const options = [
  { value: 'any', label: 'Any occasion' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'wedding', label: 'Wedding', disabled: true },
  { value: 'milestone', label: 'Work milestone' },
];

let container: HTMLDivElement;
let root: Root;

function render(element: ReactElement) {
  act(() => root.render(element));
}

const trigger = () =>
  container.querySelector('[role="combobox"]') as HTMLButtonElement;
const listbox = () => container.querySelector('[role="listbox"]');
const optionEls = () =>
  Array.from(container.querySelectorAll<HTMLElement>('[role="option"]'));

function key(el: Element, key: string) {
  act(() => {
    el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
  });
}

function click(el: Element) {
  act(() => {
    el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
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

describe('Select', () => {
  it('shows the placeholder until a value is chosen, then the matching label', () => {
    render(
      <Select options={options} value={null} onChange={() => undefined} />,
    );
    expect(trigger().textContent).toBe('Select…');

    render(
      <Select options={options} value="birthday" onChange={() => undefined} />,
    );
    expect(trigger().textContent).toBe('Birthday');
  });

  it('is closed by default and opens on click', () => {
    render(
      <Select options={options} value={null} onChange={() => undefined} />,
    );
    expect(listbox()).toBeNull();
    click(trigger());
    expect(listbox()).not.toBeNull();
    expect(trigger().getAttribute('aria-expanded')).toBe('true');
  });

  it('commits an option on click and closes', () => {
    const onChange = vi.fn();
    render(<Select options={options} value={null} onChange={onChange} />);
    click(trigger());
    click(optionEls()[1]);
    expect(onChange).toHaveBeenCalledWith('birthday');
    expect(listbox()).toBeNull();
  });

  it('navigates with arrows, skips disabled options and commits with Enter', () => {
    const onChange = vi.fn();
    render(<Select options={options} value="birthday" onChange={onChange} />);
    key(trigger(), 'ArrowDown'); // opens on the current value
    key(trigger(), 'ArrowDown'); // Wedding is disabled → Work milestone
    expect(trigger().getAttribute('aria-activedescendant')).toBe(
      optionEls()[3].id,
    );
    key(trigger(), 'Enter');
    expect(onChange).toHaveBeenCalledWith('milestone');
  });

  it('never commits a disabled option', () => {
    const onChange = vi.fn();
    render(<Select options={options} value={null} onChange={onChange} />);
    click(trigger());
    click(optionEls()[2]);
    expect(onChange).not.toHaveBeenCalled();
    expect(listbox()).not.toBeNull();
  });

  it('closes on Escape without changing the value', () => {
    const onChange = vi.fn();
    render(<Select options={options} value="any" onChange={onChange} />);
    click(trigger());
    key(trigger(), 'ArrowDown');
    key(trigger(), 'Escape');
    expect(listbox()).toBeNull();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not open when disabled', () => {
    render(
      <Select
        options={options}
        value={null}
        onChange={() => undefined}
        disabled
      />,
    );
    click(trigger());
    key(trigger(), 'ArrowDown');
    expect(listbox()).toBeNull();
  });

  it('submits the value through a hidden input when named', () => {
    render(
      <Select
        name="occasion"
        options={options}
        value="milestone"
        onChange={() => undefined}
      />,
    );
    const hidden = container.querySelector(
      'input[name="occasion"]',
    ) as HTMLInputElement;
    expect(hidden.value).toBe('milestone');
  });
});
