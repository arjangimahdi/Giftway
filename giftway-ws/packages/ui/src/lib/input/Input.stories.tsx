import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: { placeholder: 'Who is this for?' },
  argTypes: {
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Filled: Story = {
  args: { defaultValue: 'Priya, my manager' },
};

export const Invalid: Story = {
  args: { defaultValue: '—', invalid: true },
};

export const Disabled: Story = {
  args: { defaultValue: 'Locked by budget filter', disabled: true },
};
