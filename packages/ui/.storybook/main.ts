/**
 * Storybook Main Configuration
 *
 * Configures Storybook 8 for Angular with TailwindCSS support
 */

import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    // Add PostCSS loader for Tailwind CSS
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    // Find and update CSS rule
    const cssRule = config.module.rules.find(
      (rule) => rule && typeof rule === 'object' && rule.test && rule.test.toString().includes('.css')
    );

    if (cssRule && typeof cssRule === 'object' && Array.isArray(cssRule.use)) {
      cssRule.use = cssRule.use.map((loader) => {
        if (typeof loader === 'object' && loader.loader && loader.loader.includes('postcss-loader')) {
          return {
            ...loader,
            options: {
              ...loader.options,
              postcssOptions: {
                plugins: [
                  require('tailwindcss'),
                  require('autoprefixer'),
                ],
              },
            },
          };
        }
        return loader;
      });
    }

    return config;
  },
};

export default config;
