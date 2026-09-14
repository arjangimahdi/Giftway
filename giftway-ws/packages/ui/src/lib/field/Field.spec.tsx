import { act, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { Input } from '../input/Input';
import { Field } from './Field';

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let container: HTMLDivElement;
let root: Root;

function render(element: ReactElement) {
  act(() => root.render(element));
}

const label = () => container.querySelector('label') as HTMLLabelElement;
const input = () => container.querySelector('input') as HTMLInputElement;
const message = () => container.querySelector('p');

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root.unmount());
  container.remove();
});

describe('Field', () => {
  it('generates an id and wires the label to the control', () => {
    render(
      <Field label="Name">
        <Input />
      </Field>,
    );
    expect(input().id).not.toBe('');
    expect(label().htmlFor).toBe(input().id);
    expect(label().textContent).toBe('Name');
  });

  it('keeps the label wired when the consumer provides the control id', () => {
    render(
      <Field label="Name">
        <Input id="recipient" />
      </Field>,
    );
    expect(input().id).toBe('recipient');
    expect(label().htmlFor).toBe('recipient');
  });

  it('renders the message and describes the control with it', () => {
    render(
      <Field label="Name" message="Shown on the results page">
        <Input />
      </Field>,
    );
    const msg = message() as HTMLParagraphElement;
    expect(msg.textContent).toBe('Shown on the results page');
    expect(msg.id).not.toBe('');
    expect(input().getAttribute('aria-describedby')).toBe(msg.id);
  });

  it('omits aria-describedby when there is no message', () => {
    render(
      <Field label="Name">
        <Input />
      </Field>,
    );
    expect(message()).toBeNull();
    expect(input().hasAttribute('aria-describedby')).toBe(false);
  });

  it('passes invalid down so the control is marked aria-invalid', () => {
    render(
      <Field label="Name" invalid message="Required">
        <Input />
      </Field>,
    );
    expect(input().getAttribute('aria-invalid')).toBe('true');
    expect(message()?.classList.contains('text-danger-500')).toBe(true);
  });
});
