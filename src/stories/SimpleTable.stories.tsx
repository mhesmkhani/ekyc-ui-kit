import type { Meta, StoryObj } from '@storybook/react';

import SimpleTable from '../components/elements/simple-table';

const meta = {
  title: 'Elements/SimpleTable',
  component: SimpleTable,
  tags: ['autodocs'],
  args: {
    columns: [
      { key: 'name', label: 'نام' },
      { key: 'status', label: 'وضعیت' },
      { key: 'amount', label: 'مبلغ' },
    ],
    data: [
      { name: 'درخواست اول', status: 'در انتظار بررسی', amount: '۱۲۰,۰۰۰' },
      { name: 'درخواست دوم', status: 'تایید شده', amount: '۳۴۰,۰۰۰' },
      { name: 'درخواست سوم', status: 'رد شده', amount: '۸۰,۰۰۰' },
    ],
    className: 'min-w-[520px]',
  },
} satisfies Meta<typeof SimpleTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
