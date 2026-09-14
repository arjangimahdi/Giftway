import { act, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from './Table';

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

describe('Table', () => {
  it('composes semantic table elements', () => {
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Product</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Mug</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    expect(
      container.querySelector('table > thead > tr > th')?.textContent,
    ).toBe('Product');
    expect(
      container.querySelector('table > tbody > tr > td')?.textContent,
    ).toBe('Mug');
  });

  it('merges consumer classNames on every part', () => {
    render(
      <Table className="t">
        <TableHead className="h">
          <TableRow className="r">
            <TableHeaderCell className="hc">A</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody className="b">
          <TableRow>
            <TableCell className="c">B</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );
    for (const cls of ['t', 'h', 'r', 'hc', 'b', 'c']) {
      expect(container.querySelector(`.${cls}`)).not.toBeNull();
    }
    expect(container.querySelector('table')?.classList.contains('w-full')).toBe(
      true,
    );
  });
});
