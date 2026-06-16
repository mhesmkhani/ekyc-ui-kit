import type { Meta, StoryObj } from '@storybook/react';
import { Mail, Search } from 'lucide-react';

import Input from '../components/elements/input';

const meta = {
  title: 'Elements/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    inputSize: { control: 'select', options: ['sm', 'md', 'lg'] },
    colorScheme: { control: 'select', options: ['primary', 'secondary', 'neutral', 'gray'] },
    onChange: { action: 'changed' },
  },
  args: {
    label: 'نام کاربری',
    placeholder: 'نام کاربری را وارد کنید',
    inputSize: 'md',
    colorScheme: 'primary',
    disabled: false,
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithIcons: Story = {
  args: {
    label: 'ایمیل',
    placeholder: 'example@email.com',
    startIcon: <Mail />,
    endIcon: <Search />,
  },
};

export const Error: Story = {
  args: {
    label: 'شماره موبایل',
    placeholder: '09xxxxxxxxx',
    error: 'شماره موبایل معتبر نیست.',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex w-[420px] flex-col gap-4">
      <Input label="Small" inputSize="sm" placeholder="Small input" />
      <Input label="Medium" inputSize="md" placeholder="Medium input" />
      <Input label="Large" inputSize="lg" placeholder="Large input" />
    </div>
  ),
};
