import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  args: { placeholder: 'Anything else we should know?' },
  argTypes: {
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const Invalid: Story = {
  args: { invalid: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};
