import type { Meta, StoryObj } from '@storybook/react';
import { ButtonSquare } from './ButtonSquare';

const PlusIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M8 3v10M3 8h10" />
  </svg>
);

const meta = {
  title: 'Components/ButtonSquare',
  component: ButtonSquare,
  args: { icon: PlusIcon, 'aria-label': 'Save' },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof ButtonSquare>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Ghost: Story = {
  args: { variant: 'ghost' },
};

export const Small: Story = {
  args: { variant: 'primary', size: 'sm' },
};

export const Large: Story = {
  args: { variant: 'primary', size: 'lg' },
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true },
};
