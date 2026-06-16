import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import ImageUploader from '../components/elements/image-uploader';
import type { ImageUploaderProps } from '../components/elements/image-uploader/image-uploader.props';

const ControlledImageUploader = (args: ImageUploaderProps) => {
  const [value, setValue] = useState<ImageUploaderProps['value']>(args.value ?? null);

  return (
    <div className="w-[360px]">
      <ImageUploader
        {...args}
        value={value}
        onChange={(files) => {
          setValue(files);
          args.onChange?.(files);
        }}
        onRemove={() => {
          setValue(null);
          args.onRemove?.();
        }}
      />
    </div>
  );
};

const meta = {
  title: 'Elements/ImageUploader',
  component: ImageUploader,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    onError: { action: 'error' },
    onRemove: { action: 'removed' },
  },
  args: {
    title: 'آپلود تصویر',
    subtitle: 'فرمت‌های تصویر تا ۵ مگابایت',
    accept: 'image/*',
    multiple: false,
    maxSize: 5,
    preview: true,
    disabled: false,
    enableZoom: true,
  },
  render: (args) => <ControlledImageUploader {...args} />,
} satisfies Meta<typeof ImageUploader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
