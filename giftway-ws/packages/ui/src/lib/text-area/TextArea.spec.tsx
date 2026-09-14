import { act, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { vi } from 'vitest';
import { TextArea } from './TextArea';

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

function render(element: ReactElement) {
  act(() => root.render(element));
  return container.querySelector('textarea') as HTMLTextAreaElement;
}

function type(el: HTMLTextAreaElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(
    HTMLTextAreaElement.prototype,
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

describe('TextArea', () => {
  it('sets aria-invalid only when invalid', () => {
    expect(render(<TextArea />).getAttribute('aria-invalid')).toBeNull();
    expect(render(<TextArea invalid />).getAttribute('aria-invalid')).toBe(
      'true',
    );
  });

  it('merges a consumer className onto the shared input styles', () => {
    const textarea = render(<TextArea className="h-40" />);
    expect(textarea.classList.contains('h-40')).toBe(true);
    expect(textarea.classList.contains('rounded-md')).toBe(true);
  });

  it('forwards disabled and rows', () => {
    const textarea = render(<TextArea disabled rows={5} />);
    expect(textarea.disabled).toBe(true);
    expect(textarea.rows).toBe(5);
  });

  it('reports typed text through onChange', () => {
    const onChange = vi.fn();
    const textarea = render(
      <TextArea value="" onChange={(e) => onChange(e.target.value)} />,
    );
    type(textarea, 'Loves hiking');
    expect(onChange).toHaveBeenCalledWith('Loves hiking');
  });
});
