import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import RadioOption from '../components/elements/radio-option';

const meta = {
  title: 'Elements/RadioOption',
  component: RadioOption,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    dir: { control: 'select', options: ['rtl', 'ltr'] },
    onChange: { action: 'changed' },
  },
  args: {
    id: 'radio-email',
    name: 'notification',
    value: 'email',
    label: 'ایمیل',
    checked: true,
    size: 'medium',
    dir: 'rtl',
    disabled: false,
  },
} satisfies Meta<typeof RadioOption>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Group: Story = {
  render: () => {
    const RadioGroup = () => {
      const [selected, setSelected] = useState('sms');

      return (
        <div className="flex flex-col gap-4">
          <RadioOption id="notification-sms" name="notification-group" value="sms" label="پیامک" checked={selected === 'sms'} onChange={setSelected} />
          <RadioOption id="notification-email" name="notification-group" value="email" label="ایمیل" checked={selected === 'email'} onChange={setSelected} />
          <RadioOption id="notification-call" name="notification-group" value="call" label="تماس تلفنی" checked={selected === 'call'} onChange={setSelected} />
        </div>
      );
    };

    return <RadioGroup />;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
