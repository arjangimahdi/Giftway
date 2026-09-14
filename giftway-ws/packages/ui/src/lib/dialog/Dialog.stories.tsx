import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';
import { Button } from '../button/Button';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  args: {
    open: true,
    onClose: () => undefined,
    title: 'Send this shortlist?',
    children:
      'We will email the nine matches and keep the link live for thirty days.',
  },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  render: (args) => (
    <Dialog
      {...args}
      actions={
        <>
          <Button variant="secondary">Cancel</Button>
          <Button>Send it</Button>
        </>
      }
    />
  ),
};

export const Triggered: Story = {
  args: { open: false },
  render: (args) => {
    const [open, setOpen] = useState(args.open);
    return (
      <div className="p-6">
        <Button onClick={() => setOpen(true)}>Open dialog</Button>
        <Dialog
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          actions={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Send it</Button>
            </>
          }
        />
      </div>
    );
  },
};
