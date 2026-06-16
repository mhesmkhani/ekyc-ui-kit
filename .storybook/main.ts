import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)', '../src/**/*.mdx'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../public'],
  typescript: {
    // Avoid Storybook index failures caused by react-docgen parsing complex/polymorphic TS components.
    // This keeps stories, docs pages, controls, fonts, logo, and palette working.
    reactDocgen: false,
  },
  viteFinal: async (config) => {
    config.server = {
      ...config.server,
      host: '0.0.0.0',
      strictPort: true,
      // Useful when opening Storybook from another device through a LAN IP.
      // If your Vite version ignores this, it is harmless.
      allowedHosts: true,
    };

    return config;
  },
};

export default config;
