import type { Meta, StoryObj } from '@storybook/react';

import Divider from '../components/elements/divider';

const meta = {
  title: 'Elements/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    position: { control: 'select', options: ['start', 'center', 'end'] },
    colorScheme: { control: 'select', options: ['primary', 'neutral', 'secondary'] },
  },
  args: {
    children: 'عنوان بخش',
    position: 'start',
    colorScheme: 'neutral',
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Positions: Story = {
  render: () => (
    <div className="flex w-[520px] flex-col gap-8">
      <Divider position="start" colorScheme="secondary">شروع</Divider>
      <Divider position="center" colorScheme="primary">وسط</Divider>
      <Divider position="end" colorScheme="neutral">پایان</Divider>
    </div>
  ),
};
