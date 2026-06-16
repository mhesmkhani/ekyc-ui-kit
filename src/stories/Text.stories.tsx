import type { Meta, StoryObj } from '@storybook/react';

import Text from '../components/elements/text';

const meta = {
  title: 'Elements/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span', 'div', 'label', 'small', 'strong', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'medium', 'semibold', 'bold'],
    },
    className: { control: 'text' },
  },
  args: {
    as: 'p',
    size: 'md',
    weight: 'normal',
    children: 'متن نمونه برای نمایش کامپوننت Text',
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="w-[520px] space-y-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <Text size="xs">Extra small / متن خیلی کوچک</Text>
      <Text size="sm">Small / متن کوچک</Text>
      <Text size="md">Medium / متن متوسط</Text>
      <Text size="lg">Large / متن بزرگ</Text>
      <Text size="xl">Extra large / متن خیلی بزرگ</Text>
      <Text size="2xl">2XL / عنوان دوم</Text>
      <Text size="3xl">3XL / عنوان اصلی</Text>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="w-[520px] space-y-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <Text weight="normal">Normal weight / وزن معمولی</Text>
      <Text weight="medium">Medium weight / وزن متوسط</Text>
      <Text weight="semibold">Semibold weight / نیمه ضخیم</Text>
      <Text weight="bold">Bold weight / ضخیم</Text>
    </div>
  ),
};

export const SemanticElements: Story = {
  render: () => (
    <article className="w-[640px] space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <Text as="h1" size="3xl" weight="bold" className="text-dark-900">
        عنوان اصلی صفحه
      </Text>
      <Text as="h2" size="xl" weight="semibold" className="text-primary-600">
        عنوان بخش
      </Text>
      <Text as="p" size="md" className="leading-8 text-dark-700">
        این کامپوننت می‌تواند با تگ‌های معنایی متفاوت مثل paragraph، heading، span و label رندر شود.
      </Text>
      <Text as="small" size="sm" className="text-gray-500">
        توضیح کمکی یا متن کوچک
      </Text>
    </article>
  ),
};
