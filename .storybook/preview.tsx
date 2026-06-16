import type { Preview } from '@storybook/react';

import '../src/styles/storybook.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
  globalTypes: {
    direction: {
      description: 'Text direction',
      defaultValue: 'rtl',
      toolbar: {
        icon: 'transfer',
        items: [
          { value: 'rtl', title: 'RTL' },
          { value: 'ltr', title: 'LTR' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const direction = context.globals.direction as 'rtl' | 'ltr';
      document.documentElement.dir = direction;
      document.body.dir = direction;

      return (
        <div dir={direction} className="min-h-[120px] min-w-[320px] p-4 font-sans text-dark-900">
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
