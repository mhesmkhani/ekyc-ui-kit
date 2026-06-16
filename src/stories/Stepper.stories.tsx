import type { Meta, StoryObj } from '@storybook/react';

import Stepper from '../components/elements/stepper';

const steps = [
  { id: 1, label: 'ثبت اطلاعات', date: '1404/02/01 10:00' },
  { id: 2, label: 'بررسی مدارک', date: '1404/02/02 11:30' },
  { id: 3, label: 'تایید نهایی', date: '1404/02/03 09:15' },
  { id: 4, label: 'تکمیل', date: '1404/02/04 12:45' },
];

const meta = {
  title: 'Elements/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    currentStep: { control: { type: 'range', min: 1, max: 4, step: 1 } },
    onStepClick: { action: 'step clicked' },
  },
  args: {
    steps,
    currentStep: 2,
    className: 'w-[640px] pb-12',
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Completed: Story = {
  args: {
    currentStep: 4,
  },
};
