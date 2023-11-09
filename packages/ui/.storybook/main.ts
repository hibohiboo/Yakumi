import type { StorybookConfig } from '@storybook/react-vite';
import path from 'path';
import { loadConfigFromFile, mergeConfig } from 'vite';
import remarkGfm from 'remark-gfm';

const configEnvServe = {
  mode: 'development',
  command: 'serve',
  ssrBuild: false,
} as const;
const storybookConfig: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-links',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async viteFinal(config, { configType }) {
    const f = await loadConfigFromFile(
      configEnvServe,
      path.resolve(__dirname, '../vite.config.ts'),
    );
    if (!f) return config;
    const { config: userConfig } = f;

    return mergeConfig(config, {
      ...userConfig,
      plugins: [],
    });
  },
  staticDirs: ['../public'],
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="styles/globals.css" />
  `,
};
export default storybookConfig;
