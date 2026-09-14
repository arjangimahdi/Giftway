import type { Meta, StoryObj } from '@storybook/react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from './Table';
import { Tag } from '../tag/Tag';

const rows = [
  {
    store: 'Kinfolk Goods',
    items: 128,
    run: '12 min ago',
    status: 'Fresh',
    variant: 'primary',
  },
  {
    store: 'Halden Studio',
    items: 94,
    run: '1 hr ago',
    status: 'Queued',
    variant: 'secondary',
  },
  {
    store: 'Marrow & Co',
    items: 61,
    run: '4 hrs ago',
    status: 'Stale',
    variant: 'outline',
  },
] as const;

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: { layout: 'padded' },
  render: (args) => (
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Store</TableHeaderCell>
          <TableHeaderCell>Items pulled</TableHeaderCell>
          <TableHeaderCell>Last run</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.store}>
            <TableCell>{row.store}</TableCell>
            <TableCell>{row.items}</TableCell>
            <TableCell>{row.run}</TableCell>
            <TableCell>
              <Tag variant={row.variant}>{row.status}</Tag>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ScrapeLog: Story = {};
