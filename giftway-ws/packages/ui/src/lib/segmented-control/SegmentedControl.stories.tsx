import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedControl } from './SegmentedControl';

const sortOptions = [
  { value: 'match', label: 'Best match' },
  { value: 'price', label: 'Price' },
  { value: 'rating', label: 'Rating' },
];

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl,
  args: {
    'aria-label': 'Sort results',
    options: sortOptions,
    value: 'match',
    onChange: () => undefined,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <SegmentedControl {...args} value={value} onChange={setValue} />;
  },
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeOptions: Story = {};

export const TwoOptions: Story = {
  args: {
    'aria-label': 'View',
    options: [
      { value: 'grid', label: 'Grid' },
      { value: 'list', label: 'List' },
    ],
    value: 'list',
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      ...sortOptions,
      { value: 'new', label: 'Newest', disabled: true },
    ],
  },
};
