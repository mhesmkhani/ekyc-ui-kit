import type { Meta, StoryObj } from '@storybook/react';
import { Bell, Settings, User } from 'lucide-react';

import Tabs from '../components/elements/tabs';

const tabs = [
  { label: 'پروفایل', icon: <User size={16} />, content: <div className="rounded-b-lg border border-t-0 bg-white p-4">محتوای پروفایل کاربر</div> },
  { label: 'اعلان‌ها', icon: <Bell size={16} />, badge: 3, content: <div className="rounded-b-lg border border-t-0 bg-white p-4">لیست اعلان‌های جدید</div> },
  { label: 'تنظیمات', icon: <Settings size={16} />, content: <div className="rounded-b-lg border border-t-0 bg-white p-4">تنظیمات حساب کاربری</div> },
  { label: 'غیرفعال', disabled: true, content: <div className="p-4">Disabled tab</div> },
];

const meta = {
  title: 'Elements/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'pills', 'underline'] },
    onTabChange: { action: 'tab changed' },
  },
  args: {
    tabs,
    defaultTab: 0,
    variant: 'default',
    fullWidth: false,
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Pills: Story = {
  args: {
    variant: 'pills',
  },
};

export const UnderlineFullWidth: Story = {
  args: {
    variant: 'underline',
    fullWidth: true,
    className: 'w-[560px]',
  },
};
