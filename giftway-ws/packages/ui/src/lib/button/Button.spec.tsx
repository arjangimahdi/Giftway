import { act, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { vi } from 'vitest';
import { Button } from './Button';

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

describe('Button', () => {
  it('renders its children', () => {
    const button = render(<Button>Find gifts</Button>);
    expect(button.textContent).toBe('Find gifts');
  });

  it('defaults to type="button" so it never submits a form by accident', () => {
    expect(render(<Button>Go</Button>).type).toBe('button');
  });

  it('respects an explicit type', () => {
    expect(render(<Button type="submit">Go</Button>).type).toBe('submit');
  });

  it('merges a consumer className onto the element', () => {
    const button = render(<Button className="mt-4">Go</Button>);
    expect(button.classList.contains('mt-4')).toBe(true);
    expect(button.classList.contains('rounded-md')).toBe(true);
  });

  it('adds w-full only when block is set', () => {
    expect(render(<Button>Go</Button>).classList.contains('w-full')).toBe(
      false,
    );
    expect(render(<Button block>Go</Button>).classList.contains('w-full')).toBe(
      true,
    );
  });

  it('forwards disabled and does not fire onClick while disabled', () => {
    const onClick = vi.fn();
    const button = render(
      <Button disabled onClick={onClick}>
        Go
      </Button>,
    );
    expect(button.disabled).toBe(true);
    act(() => button.click());
    expect(onClick).not.toHaveBeenCalled();
  });

  it('fires onClick when clicked', () => {
    const onClick = vi.fn();
    const button = render(<Button onClick={onClick}>Go</Button>);
    act(() => button.click());
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
