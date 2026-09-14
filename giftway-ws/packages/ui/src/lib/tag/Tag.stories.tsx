import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  args: { children: 'Top match' },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'primary-light', 'outline'],
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: 'primary' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'In budget' },
};

export const PrimaryLight: Story = {
  args: { variant: 'primary-light', children: 'New store' },
};

export const Outline: Story = {
  args: { variant: 'outline', children: 'Ships Friday' },
};
