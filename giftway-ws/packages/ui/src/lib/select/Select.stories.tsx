import { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const occasions = [
  { value: 'any', label: 'Any occasion' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'milestone', label: 'Work milestone' },
  { value: 'wedding', label: 'Wedding', disabled: true },
];

const meta = {
  title: 'Components/Select',
  component: Select,
  args: {
    'aria-label': 'Occasion',
    options: occasions,
    value: null,
    onChange: () => undefined,
  },
  argTypes: {
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <Select {...args} value={value} onChange={setValue} />;
  },
  decorators: [
    (Story) => (
      <div className="h-64 w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {};

export const WithValue: Story = {
  args: { value: 'birthday' },
};

export const Invalid: Story = {
  args: { invalid: true },
};

export const Disabled: Story = {
  args: { value: 'any', disabled: true },
};

/** Opens the list on mount so the popover can be reviewed without interaction. */
export const Opened: Story = {
  args: { value: 'birthday' },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
      ref.current
        ?.querySelector<HTMLButtonElement>('[role="combobox"]')
        ?.click();
    }, []);
    return (
      <div ref={ref}>
        <Select {...args} value={value} onChange={setValue} />
      </div>
    );
  },
};
