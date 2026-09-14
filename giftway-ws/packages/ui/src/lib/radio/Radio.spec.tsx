import { act, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { vi } from 'vitest';
import { Radio } from './Radio';

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

function render(element: ReactElement) {
  act(() => root.render(element));
  return container.querySelector('input') as HTMLInputElement;
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

describe('Radio', () => {
  it('renders a real radio input wrapped in a label with the text', () => {
    const input = render(<Radio name="who">Friend</Radio>);
    expect(input.type).toBe('radio');
    expect(input.name).toBe('who');
    expect(input.closest('label')?.textContent).toBe('Friend');
  });

  it('forwards checked and disabled', () => {
    const input = render(
      <Radio checked disabled onChange={() => undefined}>
        Friend
      </Radio>,
    );
    expect(input.checked).toBe(true);
    expect(input.disabled).toBe(true);
  });

  it('selects the input when the label text is clicked', () => {
    const onChange = vi.fn();
    const input = render(<Radio onChange={onChange}>Friend</Radio>);
    act(() => (input.closest('label') as HTMLLabelElement).click());
    expect(input.checked).toBe(true);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('merges a consumer className onto the label', () => {
    const input = render(<Radio className="mr-4">Friend</Radio>);
    expect(input.closest('label')?.classList.contains('mr-4')).toBe(true);
  });
});
