import type { Meta, StoryObj } from '@storybook/react';
import { Field } from './Field';
import { Input } from '../input/Input';
import { Select } from '../select/Select';
import { TextArea } from '../text-area/TextArea';

const meta = {
  title: 'Components/Field',
  component: Field,
  args: {
    label: 'Recipient',
    className: 'w-64',
    children: <Input placeholder="Who is this for?" />,
  },
  argTypes: {
    invalid: { control: 'boolean' },
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInput: Story = {};

export const WithHint: Story = {
  args: { message: 'First name is enough.' },
};

export const WithError: Story = {
  args: {
    label: 'Interests',
    invalid: true,
    message: 'Tell us at least one interest.',
    children: <Input defaultValue="—" />,
  },
};

export const WithSelect: Story = {
  args: {
    label: 'Occasion',
    children: (
      <Select
        value="any"
        onChange={() => undefined}
        options={[
          { value: 'any', label: 'Any occasion' },
          { value: 'birthday', label: 'Birthday' },
          { value: 'milestone', label: 'Work milestone' },
        ]}
      />
    ),
  },
};

export const WithTextArea: Story = {
  args: {
    label: 'Notes',
    className: 'w-96',
    children: <TextArea placeholder="Anything else we should know?" />,
  },
};
