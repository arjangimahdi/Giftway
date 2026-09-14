import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'Badge' },
  argTypes: {
    tone: {
      control: { type: 'select' },
      options: ['neutral', 'primary', 'success', 'danger'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  args: {
    tone: 'neutral',
    size: 'sm',
    children: 'Draft',
  },
};

export const Primary: Story = {
  args: {
    tone: 'primary',
    size: 'sm',
    children: 'Shared',
  },
};

export const Success: Story = {
  args: {
    tone: 'success',
    size: 'sm',
    children: 'Saved',
  },
};

export const Danger: Story = {
  args: {
    tone: 'danger',
    size: 'sm',
    children: 'Trashed',
  },
};

export const Medium: Story = {
  args: {
    tone: 'primary',
    size: 'md',
    children: 'Medium Badge',
  },
};
