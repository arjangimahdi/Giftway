import { act, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { vi } from 'vitest';
import { RangeSlider } from './RangeSlider';

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

function render(element: ReactElement) {
  act(() => root.render(element));
}

const inputs = () =>
  Array.from(container.querySelectorAll<HTMLInputElement>('input[type=range]'));
const low = () => inputs()[0];
const high = () => inputs()[1];
const output = () => container.querySelector('output') as HTMLOutputElement;
const span = () => container.querySelector('[aria-hidden]') as HTMLDivElement;

function slide(el: HTMLInputElement, value: number) {
  const setter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    'value',
  )?.set;
  act(() => {
    setter?.call(el, String(value));
    el.dispatchEvent(new Event('input', { bubbles: true }));
  });
}

const base = {
  label: 'Budget',
  min: 0,
  max: 100,
  onChange: () => undefined,
};

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('RangeSlider', () => {
  it('renders two range inputs labelled by the slider label', () => {
    render(<RangeSlider {...base} value={[20, 60]} step={5} />);
    expect(inputs()).toHaveLength(2);
    expect(low().value).toBe('20');
    expect(high().value).toBe('60');
    expect(low().step).toBe('5');
    const labelId = low().getAttribute('aria-labelledby');
    expect(document.getElementById(labelId ?? '')?.textContent).toBe('Budget');
    expect(high().getAttribute('aria-labelledby')).toBe(labelId);
  });

  it('formats both ends of the output with formatValue', () => {
    render(
      <RangeSlider {...base} value={[20, 60]} formatValue={(v) => `${v}k`} />,
    );
    expect(output().textContent).toBe('20k – 60k');
  });

  it('reports a low handle move and pushes high up when overtaken', () => {
    const onChange = vi.fn();
    render(<RangeSlider {...base} value={[20, 60]} onChange={onChange} />);
    slide(low(), 30);
    expect(onChange).toHaveBeenLastCalledWith([30, 60]);
    slide(low(), 70);
    expect(onChange).toHaveBeenLastCalledWith([70, 70]);
  });

  it('reports a high handle move and pulls low down when undercut', () => {
    const onChange = vi.fn();
    render(<RangeSlider {...base} value={[20, 60]} onChange={onChange} />);
    slide(high(), 80);
    expect(onChange).toHaveBeenLastCalledWith([20, 80]);
    slide(high(), 10);
    expect(onChange).toHaveBeenLastCalledWith([10, 10]);
  });

  it('positions the filled span from the value within min..max', () => {
    render(<RangeSlider {...base} min={100} max={300} value={[150, 250]} />);
    expect(span().style.left).toBe('25%');
    expect(span().style.width).toBe('50%');
  });

  it('disables both handles together', () => {
    render(<RangeSlider {...base} value={[20, 60]} disabled />);
    expect(low().disabled).toBe(true);
    expect(high().disabled).toBe(true);
  });
});
