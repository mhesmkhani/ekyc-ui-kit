import type { Meta, StoryObj } from '@storybook/react';
import { CheckCircle } from 'lucide-react';

import Alert from '../components/elements/alert';

const meta = {
  title: 'Elements/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['success', 'error', 'warning', 'info'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    onDismiss: { action: 'dismissed' },
    onOptionClick: { action: 'option clicked' },
  },
  args: {
    variant: 'info',
    title: 'اطلاع‌رسانی',
    message: 'این یک پیام نمونه برای نمایش Alert در Storybook است.',
    size: 'md',
    showIcon: true,
    dismissible: false,
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex w-[520px] flex-col gap-3">
      <Alert variant="success" title="موفق" message="عملیات با موفقیت انجام شد." />
      <Alert variant="error" title="خطا" message="در انجام عملیات مشکلی پیش آمد." />
      <Alert variant="warning" title="هشدار" message="لطفا اطلاعات را دوباره بررسی کنید." />
      <Alert variant="info" title="اطلاعیه" message="برای ادامه، مرحله بعدی را تکمیل کنید." />
    </div>
  ),
};

export const WithMessages: Story = {
  args: {
    variant: 'warning',
    title: 'موارد قابل بررسی',
    messages: ['شماره موبایل وارد نشده است.', 'تصویر مدرک کیفیت کافی ندارد.', 'کد ملی باید ۱۰ رقم باشد.'],
    ordered: true,
  },
};

export const WithActions: Story = {
  args: {
    variant: 'success',
    title: 'درخواست ثبت شد',
    message: 'می‌توانید وضعیت درخواست را مشاهده یا پیام را ببندید.',
    dismissible: true,
    options: [
      { label: 'مشاهده وضعیت', variant: 'primary' },
      { label: 'بستن', variant: 'secondary', dismissOnClick: true },
    ],
  },
};

export const CustomIcon: Story = {
  args: {
    variant: 'success',
    icon: <CheckCircle className="text-green-700" />,
    title: 'آیکن سفارشی',
    message: 'این Alert با آیکن سفارشی نمایش داده شده است.',
  },
};
