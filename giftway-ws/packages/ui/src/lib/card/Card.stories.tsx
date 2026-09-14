import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardBody, CardFooter, CardTitle } from './Card';
import { Button } from '../button/Button';

const meta = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    padding: {
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
    elevated: { control: 'boolean' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    padding: 'md',
    elevated: false,
  },
  render: (args) => (
    <Card {...args}>
      <CardTitle>Card Title</CardTitle>
      <CardBody>This is the card body with some descriptive text.</CardBody>
      <CardFooter>
        <Button size="sm" variant="primary">
          Action
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Elevated: Story = {
  args: {
    padding: 'md',
    elevated: true,
  },
  render: (args) => (
    <Card {...args}>
      <CardTitle>Elevated Card</CardTitle>
      <CardBody>This card has a shadow for emphasis.</CardBody>
      <CardFooter>
        <Button size="sm" variant="secondary">
          Cancel
        </Button>
        <Button size="sm" variant="primary">
          Confirm
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const Compact: Story = {
  args: {
    padding: 'sm',
    elevated: false,
  },
  render: (args) => (
    <Card {...args}>
      <CardTitle>Compact Card</CardTitle>
      <CardBody>Smaller padding version.</CardBody>
    </Card>
  ),
};

export const WithoutFooter: Story = {
  args: {
    padding: 'md',
    elevated: false,
  },
  render: (args) => (
    <Card {...args}>
      <CardTitle>Simple Card</CardTitle>
      <CardBody>A card without any footer actions.</CardBody>
    </Card>
  ),
};
