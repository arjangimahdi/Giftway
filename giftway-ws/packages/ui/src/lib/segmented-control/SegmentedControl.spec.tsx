import { act, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { vi } from 'vitest';
import { SegmentedControl } from './SegmentedControl';

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

const options = [
  { value: 'him', label: 'Him' },
  { value: 'her', label: 'Her' },
  { value: 'them', label: 'Them', disabled: true },
];

let container: HTMLDivElement;
let root: Root;

function render(element: ReactElement) {
  act(() => root.render(element));
}

const radios = () =>
  Array.from(container.querySelectorAll<HTMLInputElement>('input[type=radio]'));

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('SegmentedControl', () => {
  it('renders a radiogroup with one labelled radio per option', () => {
    render(
      <SegmentedControl
        options={options}
        value="him"
        onChange={() => undefined}
        aria-label="Recipient"
      />,
    );
    const group = container.querySelector('[role="radiogroup"]');
    expect(group?.getAttribute('aria-label')).toBe('Recipient');
    expect(radios()).toHaveLength(3);
    expect(radios().map((r) => r.closest('label')?.textContent)).toEqual([
      'Him',
      'Her',
      'Them',
    ]);
  });

  it('checks only the radio matching value', () => {
    render(
      <SegmentedControl
        options={options}
        value="her"
        onChange={() => undefined}
      />,
    );
    expect(radios().map((r) => r.checked)).toEqual([false, true, false]);
  });

  it('calls onChange with the clicked option value', () => {
    const onChange = vi.fn();
    render(
      <SegmentedControl options={options} value="him" onChange={onChange} />,
    );
    act(() => radios()[1].click());
    expect(onChange).toHaveBeenCalledWith('her');
  });

  it('cannot choose a disabled option', () => {
    const onChange = vi.fn();
    render(
      <SegmentedControl options={options} value="him" onChange={onChange} />,
    );
    expect(radios()[2].disabled).toBe(true);
    act(() => radios()[2].click());
    expect(onChange).not.toHaveBeenCalled();
  });

  it('shares one group name across radios and honours a custom name', () => {
    render(
      <SegmentedControl
        options={options}
        value="him"
        onChange={() => undefined}
      />,
    );
    const generated = new Set(radios().map((r) => r.name));
    expect(generated.size).toBe(1);
    expect([...generated][0]).not.toBe('');

    render(
      <SegmentedControl
        name="recipient"
        options={options}
        value="him"
        onChange={() => undefined}
      />,
    );
    expect(radios().every((r) => r.name === 'recipient')).toBe(true);
  });
});
