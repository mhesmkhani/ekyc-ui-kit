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
    reactDocgen: false,
  },
  viteFinal: async (config) => {
    config.server = {
      ...config.server,
      host: '0.0.0.0',
      strictPort: true,
      allowedHosts: true,
    };

    return config;
  },
};

export default config;
