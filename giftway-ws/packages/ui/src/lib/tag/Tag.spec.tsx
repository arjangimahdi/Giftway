import { act, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Tag } from './Tag';

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

describe('Tag', () => {
  it('renders its children in a span', () => {
    expect(render(<Tag>Under budget</Tag>).textContent).toBe('Under budget');
  });

  it('merges a consumer className and forwards attributes', () => {
    const tag = render(
      <Tag className="ml-2" title="hint">
        Under budget
      </Tag>,
    );
    expect(tag.classList.contains('ml-2')).toBe(true);
    expect(tag.classList.contains('rounded-sm')).toBe(true);
    expect(tag.title).toBe('hint');
  });
});
