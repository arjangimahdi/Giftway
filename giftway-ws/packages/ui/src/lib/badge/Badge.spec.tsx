import { act, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Badge } from './Badge';

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

function render(element: ReactElement) {
  act(() => root.render(element));
  return container.querySelector('span') as HTMLSpanElement;
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

describe('Badge', () => {
  it('renders its children in a span', () => {
    expect(render(<Badge>New</Badge>).textContent).toBe('New');
  });

  it('merges a consumer className and forwards attributes', () => {
    const badge = render(
      <Badge className="ml-2" data-testid="b">
        New
      </Badge>,
    );
    expect(badge.classList.contains('ml-2')).toBe(true);
    expect(badge.classList.contains('rounded-full')).toBe(true);
    expect(badge.dataset['testid']).toBe('b');
  });
});
