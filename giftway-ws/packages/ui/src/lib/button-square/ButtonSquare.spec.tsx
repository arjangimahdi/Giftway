import { act, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { vi } from 'vitest';
import { ButtonSquare } from './ButtonSquare';

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

const icon = <svg data-testid="icon" />;

describe('ButtonSquare', () => {
  it('renders the icon prop as its only content', () => {
    const button = render(<ButtonSquare aria-label="Close" icon={icon} />);
    expect(button.querySelector('[data-testid="icon"]')).not.toBeNull();
    expect(button.textContent).toBe('');
  });

  it('exposes the aria-label as its accessible name', () => {
    const button = render(<ButtonSquare aria-label="Close" icon={icon} />);
    expect(button.getAttribute('aria-label')).toBe('Close');
  });

  it('defaults to type="button" and respects an explicit type', () => {
    expect(render(<ButtonSquare aria-label="Go" icon={icon} />).type).toBe(
      'button',
    );
    expect(
      render(<ButtonSquare aria-label="Go" icon={icon} type="submit" />).type,
    ).toBe('submit');
  });

  it('merges a consumer className onto the element', () => {
    const button = render(
      <ButtonSquare aria-label="Go" icon={icon} className="ml-2" />,
    );
    expect(button.classList.contains('ml-2')).toBe(true);
    expect(button.classList.contains('aspect-square')).toBe(true);
  });

  it('forwards disabled and does not fire onClick while disabled', () => {
    const onClick = vi.fn();
    const button = render(
      <ButtonSquare aria-label="Go" icon={icon} disabled onClick={onClick} />,
    );
    expect(button.disabled).toBe(true);
    act(() => button.click());
    expect(onClick).not.toHaveBeenCalled();
  });

  it('fires onClick when clicked', () => {
    const onClick = vi.fn();
    const button = render(
      <ButtonSquare aria-label="Go" icon={icon} onClick={onClick} />,
    );
    act(() => button.click());
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
