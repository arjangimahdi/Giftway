import { act, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { vi } from 'vitest';
import { Dialog } from './Dialog';

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

function render(element: ReactElement) {
  act(() => root.render(element));
}

const dialog = () => container.querySelector('[role="dialog"]') as HTMLElement;
const backdrop = () => container.firstElementChild as HTMLElement;

function pressEscape() {
  act(() => {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
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

describe('Dialog', () => {
  it('renders nothing while closed', () => {
    render(
      <Dialog open={false} onClose={() => undefined} title="Start over?" />,
    );
    expect(container.innerHTML).toBe('');
  });

  it('renders a modal dialog labelled by its title with body and actions', () => {
    render(
      <Dialog
        open
        onClose={() => undefined}
        title="Start over?"
        actions={<button>Yes</button>}
      >
        Your answers will be cleared.
      </Dialog>,
    );
    expect(dialog().getAttribute('aria-modal')).toBe('true');
    const title = document.getElementById(
      dialog().getAttribute('aria-labelledby') ?? '',
    );
    expect(title?.textContent).toBe('Start over?');
    expect(dialog().textContent).toContain('Your answers will be cleared.');
    expect(dialog().querySelector('button')?.textContent).toBe('Yes');
  });

  it('closes on Escape', () => {
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose} title="Start over?" />);
    pressEscape();
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes on backdrop click but not on a click inside the panel', () => {
    const onClose = vi.fn();
    render(
      <Dialog open onClose={onClose} title="Start over?">
        Body
      </Dialog>,
    );
    click(dialog());
    expect(onClose).not.toHaveBeenCalled();
    click(backdrop());
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('stops listening for Escape once closed', () => {
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose} title="Start over?" />);
    render(<Dialog open={false} onClose={onClose} title="Start over?" />);
    pressEscape();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('stops listening for Escape after unmount', () => {
    const onClose = vi.fn();
    render(<Dialog open onClose={onClose} title="Start over?" />);
    act(() => root.unmount());
    root = createRoot(container);
    pressEscape();
    expect(onClose).not.toHaveBeenCalled();
  });
});
