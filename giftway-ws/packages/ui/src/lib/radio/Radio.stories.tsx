import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta = {
  title: 'Components/Radio',
  component: Radio,
  args: { children: 'Ship to me', name: 'ship' },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { children: 'Store pickup', disabled: true },
};

export const Group: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Radio {...args} defaultChecked>
        Ship to me
      </Radio>
      <Radio {...args}>Ship to them</Radio>
      <Radio {...args} disabled>
        Store pickup
      </Radio>
    </div>
  ),
};
