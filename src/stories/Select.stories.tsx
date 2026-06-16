import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Select from '../components/elements/select';
import type { SelectProps } from '../components/elements/select/select.props';

const options = [
  { value: 'draft', label: 'پیش‌نویس' },
  { value: 'pending', label: 'در انتظار بررسی' },
  { value: 'approved', label: 'تایید شده' },
  { value: 'rejected', label: 'رد شده' },
];

const ControlledSelect = (args: SelectProps) => {
  const [value, setValue] = useState<string | number | undefined>(args.value);

  return <Select {...args} value={value} onChange={setValue} />;
};

const meta = {
  title: 'Elements/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    colorScheme: { control: 'select', options: ['primary', 'secondary', 'neutral', 'gray'] },
    onChange: { action: 'changed' },
  },
  args: {
    label: 'وضعیت',
    placeholder: 'یک وضعیت انتخاب کنید',
    options,
    value: 'pending',
    size: 'md',
    colorScheme: 'primary',
    disabled: false,
  },
  render: (args) => <ControlledSelect {...args} />,
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    value: undefined,
    error: 'انتخاب وضعیت الزامی است.',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
