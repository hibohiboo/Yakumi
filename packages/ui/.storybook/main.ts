import { createRequire } from 'node:module';
import path, { dirname, join } from 'path';
import remarkGfm from 'remark-gfm';
import { loadConfigFromFile, mergeConfig } from 'vite';
import type { StorybookConfig } from '@storybook/react-vite';
const require = createRequire(import.meta.url);

const configEnvServe = {
  mode: 'development',
  command: 'serve',
  ssrBuild: false,
} as const;
const storybookConfig: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    {
      name: getAbsolutePath('@storybook/addon-docs'),
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],

  async viteFinal(config) {
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

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}
