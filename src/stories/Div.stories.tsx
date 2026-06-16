import type { Meta, StoryObj } from '@storybook/react';

import Div from '../components/elements/div';

const meta = {
  title: 'Elements/Div',
  component: Div,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
  args: {
    children: 'یک Div ساده با کلاس‌های Tailwind',
    className: 'items-center justify-center rounded-xl border border-neutral-200 bg-white p-6 shadow-sm text-dark-800',
  },
} satisfies Meta<typeof Div>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
