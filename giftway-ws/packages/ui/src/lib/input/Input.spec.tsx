import { act, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { vi } from 'vitest';
import { Input } from './Input';

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

function render(element: ReactElement) {
  act(() => root.render(element));
  return container.querySelector('input') as HTMLInputElement;
}

function type(el: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    'value',
  )?.set;
  act(() => {
    setter?.call(el, value);
    el.dispatchEvent(new Event('input', { bubbles: true }));
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

describe('Input', () => {
  it('sets aria-invalid only when invalid', () => {
    expect(render(<Input />).getAttribute('aria-invalid')).toBeNull();
    expect(render(<Input invalid />).getAttribute('aria-invalid')).toBe('true');
  });

  it('merges a consumer className', () => {
    const input = render(<Input className="max-w-xs" />);
    expect(input.classList.contains('max-w-xs')).toBe(true);
    expect(input.classList.contains('rounded-md')).toBe(true);
  });

  it('forwards disabled and native attributes', () => {
    const input = render(<Input disabled placeholder="Name" name="who" />);
    expect(input.disabled).toBe(true);
    expect(input.placeholder).toBe('Name');
    expect(input.name).toBe('who');
  });

  it('reports typed text through onChange', () => {
    const onChange = vi.fn();
    const input = render(
      <Input value="" onChange={(e) => onChange(e.target.value)} />,
    );
    type(input, 'Sara');
    expect(onChange).toHaveBeenCalledWith('Sara');
  });
});
