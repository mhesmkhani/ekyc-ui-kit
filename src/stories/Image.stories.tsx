import type { Meta, StoryObj } from '@storybook/react';

import Image from '../components/elements/image';

const sampleImage = `data:image/svg+xml;utf8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" width="640" height="400" viewBox="0 0 640 400">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop stop-color="#A62265" offset="0" />
        <stop stop-color="#2C9C9C" offset="1" />
      </linearGradient>
    </defs>
    <rect width="640" height="400" rx="32" fill="url(#g)" />
    <circle cx="500" cy="95" r="60" fill="white" opacity="0.18" />
    <circle cx="115" cy="310" r="92" fill="white" opacity="0.14" />
    <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="Arial" font-size="42" font-weight="700">UI Image</text>
  </svg>
`)}`;

const meta = {
  title: 'Elements/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    objectFit: { control: 'select', options: ['contain', 'cover', 'fill', 'none', 'scale-down'] },
    rounded: { control: 'select', options: ['none', 'sm', 'md', 'lg', 'xl', 'full'] },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'xxl', 'full'] },
    loading: { control: 'select', options: ['lazy', 'eager'] },
  },
  args: {
    src: sampleImage,
    alt: 'Sample generated placeholder',
    objectFit: 'cover',
    rounded: 'xl',
    size: 'xxl',
    loading: 'lazy',
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Fallback: Story = {
  args: {
    src: '/missing-image.png',
    fallbackSrc: sampleImage,
    alt: 'Fallback image',
  },
};
