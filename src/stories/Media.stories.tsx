import type { Meta, StoryObj } from '@storybook/react';

import Media from '../components/elements/media';

const meta = {
  title: 'Elements/Media',
  component: Media,
  tags: ['autodocs'],
  argTypes: {
    at: { control: 'select', options: [undefined, 'xs', 'sm', 'md', 'lg'] },
    lessThan: { control: 'select', options: [undefined, 'md', 'lg'] },
    greaterThan: { control: 'select', options: [undefined, 'xs', 'sm'] },
    between: { control: 'select', options: [undefined, 'xs-lg'] },
  },
  args: {
    greaterThan: 'xs',
    children: <div className="rounded-lg bg-secondary-50 p-4 text-secondary-800">این بخش فقط در breakpoint انتخابی نمایش داده می‌شود.</div>,
  },
} satisfies Meta<typeof Media>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LessThanLarge: Story = {
  args: {
    greaterThan: undefined,
    lessThan: 'lg',
  },
};
