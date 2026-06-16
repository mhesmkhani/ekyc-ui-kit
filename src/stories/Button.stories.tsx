import type { Meta, StoryObj } from '@storybook/react';
import { ArrowLeft, Plus } from 'lucide-react';

import Button from '../components/elements/button';

const meta = {
  title: 'Elements/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['solid', 'outline', 'text'] },
    colorScheme: { control: 'select', options: ['primary', 'secondary', 'danger'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg'] },
    onClick: { action: 'clicked' },
  },
  args: {
    children: 'دکمه نمونه',
    variant: 'solid',
    colorScheme: 'primary',
    size: 'md',
    disabled: false,
    isLoading: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="solid" colorScheme="primary">Solid</Button>
      <Button variant="outline" colorScheme="primary">Outline</Button>
      <Button variant="text" colorScheme="primary">Text</Button>
    </div>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button colorScheme="primary">Primary</Button>
      <Button colorScheme="secondary">Secondary</Button>
      <Button colorScheme="danger">Danger</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    children: 'افزودن مورد',
    startIcon: <Plus />,
    endIcon: <ArrowLeft />,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    loadingText: 'در حال ارسال...',
  },
};
