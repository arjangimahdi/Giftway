import { act, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Card, CardBody, CardFooter, CardTitle } from './Card';

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

function render(element: ReactElement) {
  act(() => root.render(element));
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

describe('Card', () => {
  it('renders children and merges a consumer className on the root', () => {
    render(<Card className="mt-4">Hello</Card>);
    const card = container.firstElementChild as HTMLDivElement;
    expect(card.tagName).toBe('DIV');
    expect(card.textContent).toBe('Hello');
    expect(card.classList.contains('mt-4')).toBe(true);
    expect(card.classList.contains('rounded-lg')).toBe(true);
  });

  it('composes a heading, paragraph body and footer', () => {
    render(
      <Card>
        <CardTitle className="t">Title</CardTitle>
        <CardBody className="b">Body</CardBody>
        <CardFooter className="f">Footer</CardFooter>
      </Card>,
    );
    const title = container.querySelector('h3') as HTMLElement;
    const body = container.querySelector('p') as HTMLElement;
    const footer = container.querySelector('.f') as HTMLElement;
    expect(title.textContent).toBe('Title');
    expect(title.classList.contains('t')).toBe(true);
    expect(body.textContent).toBe('Body');
    expect(body.classList.contains('b')).toBe(true);
    expect(footer.tagName).toBe('DIV');
    expect(footer.textContent).toBe('Footer');
  });
});
