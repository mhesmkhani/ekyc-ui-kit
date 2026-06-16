import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import Button from '../components/elements/button';
import Modal from '../components/elements/modal';

const meta = {
  title: 'Elements/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', 'full'] },
    onClose: { action: 'closed' },
  },
  args: {
    title: 'عنوان مودال',
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEsc: true,
    showCloseButton: true,
    titleWithDivider: false,
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const ModalDemo = () => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <Button onClick={() => setOpen(true)}>باز کردن مودال</Button>
          <Modal {...args} isOpen={open} onClose={() => setOpen(false)}>
            <div className="space-y-3 p-5">
              <p className="text-gray-700">این محتوا داخل Modal نمایش داده می‌شود.</p>
              <p className="text-sm text-gray-500">برای بستن، روی دکمه بستن یا پس‌زمینه کلیک کنید.</p>
            </div>
          </Modal>
        </>
      );
    };

    return <ModalDemo />;
  },
};

export const WithFooter: Story = {
  render: (args) => {
    const ModalWithFooterDemo = () => {
      const [open, setOpen] = useState(false);

      return (
        <>
          <Button colorScheme="secondary" onClick={() => setOpen(true)}>مودال با فوتر</Button>
          <Modal
            {...args}
            isOpen={open}
            onClose={() => setOpen(false)}
            title="تایید عملیات"
            footer={
              <>
                <Button colorScheme="secondary" onClick={() => setOpen(false)}>تایید</Button>
                <Button variant="outline" colorScheme="danger" onClick={() => setOpen(false)}>انصراف</Button>
              </>
            }
          >
            <div className="p-5 text-gray-700">آیا از انجام این عملیات مطمئن هستید؟</div>
          </Modal>
        </>
      );
    };

    return <ModalWithFooterDemo />;
  },
};
