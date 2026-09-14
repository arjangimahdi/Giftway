import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RangeSlider } from './RangeSlider';

const meta = {
  title: 'Components/RangeSlider',
  component: RangeSlider,
  args: {
    label: 'Custom range',
    min: 1,
    max: 1000,
    value: [40, 90],
    onChange: () => undefined,
    formatValue: (v: number) => `$${v.toLocaleString()}`,
  },
  argTypes: {
    disabled: { control: 'boolean' },
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <RangeSlider {...args} value={value} onChange={setValue} />;
  },
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RangeSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Toman: Story = {
  args: {
    label: 'Budget',
    min: 100_000,
    max: 5_000_000,
    step: 50_000,
    value: [500_000, 2_000_000],
    formatValue: (v: number) => `${v.toLocaleString('en-US')} T`,
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};
