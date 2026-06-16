import type { Meta, StoryObj } from '@storybook/react';

import Button from '../components/elements/button';
import Tooltip from '../components/elements/tooltip';

const meta = {
  title: 'Elements/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    content: { control: 'text' },
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
    disabled: { control: 'boolean' },
    children: { control: false },
    contentClassName: { control: 'text' },
  },
  args: {
    content: 'این متن راهنما هنگام Hover یا Focus نمایش داده می‌شود.',
    placement: 'top',
    disabled: false,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outline">روی من Hover کنید</Button>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8 rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
      <div />
      <Tooltip content="بالا" placement="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <div />

      <Tooltip content="چپ" placement="left">
        <Button variant="outline">Left</Button>
      </Tooltip>
      <div />
      <Tooltip content="راست" placement="right">
        <Button variant="outline">Right</Button>
      </Tooltip>

      <div />
      <Tooltip content="پایین" placement="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
      <div />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="outline">Tooltip غیرفعال</Button>
    </Tooltip>
  ),
};
