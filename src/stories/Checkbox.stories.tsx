import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Checkbox from '../components/elements/checkbox';
import type { CheckboxProps } from '../components/elements/checkbox/checkbox.props';

const ControlledCheckbox = (args: CheckboxProps) => {
  const [checked, setChecked] = useState(Boolean(args.checked));

  return <Checkbox {...args} checked={checked} onChange={setChecked} />;
};

const meta = {
  title: 'Elements/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    dir: { control: 'select', options: ['rtl', 'ltr'] },
    onChange: { action: 'changed' },
  },
  args: {
    id: 'storybook-checkbox',
    label: 'پذیرش قوانین و مقررات',
    checked: false,
    disabled: false,
    size: 'medium',
    dir: 'rtl',
  },
  render: (args) => <ControlledCheckbox {...args} />,
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ControlledCheckbox id="checkbox-small" label="Small" size="small" dir="ltr" />
      <ControlledCheckbox id="checkbox-medium" label="Medium" size="medium" dir="ltr" checked />
      <ControlledCheckbox id="checkbox-large" label="Large" size="large" dir="ltr" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    checked: true,
    disabled: true,
  },
};
