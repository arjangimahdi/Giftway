import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  args: { children: 'Minimal' },
  argTypes: {
    shape: { control: { type: 'select' }, options: ['pill', 'tile'] },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PillIdle: Story = {
  args: { children: 'Pill, idle' },
};

export const PillSelected: Story = {
  args: { children: 'Pill, selected', selected: true },
};

export const TileIdle: Story = {
  args: { shape: 'tile' },
};

export const TileSelected: Story = {
  args: { shape: 'tile', selected: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

const answers = [
  'Minimal',
  'Tactile',
  'Loud colour',
  'Something edible',
  'Handmade',
];

export const MultiSelect: Story = {
  args: { shape: 'tile' },
  render: (args) => {
    const [picked, setPicked] = useState<string[]>(['Minimal']);
    const toggle = (label: string) =>
      setPicked((p) =>
        p.includes(label) ? p.filter((x) => x !== label) : [...p, label],
      );
    return (
      <div className="flex max-w-xl flex-wrap gap-3">
        {answers.map((label) => (
          <Chip
            key={label}
            {...args}
            selected={picked.includes(label)}
            onToggle={() => toggle(label)}
          >
            {label}
          </Chip>
        ))}
      </div>
    );
  },
};
