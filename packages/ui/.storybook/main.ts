import { createRequire } from 'node:module';
import path, { dirname, join } from 'path';
import remarkGfm from 'remark-gfm';
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
    // The CJS build of Vite's Node API is deprecated. See https://vite.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details. の警告を回避するためにdynamic importを使用
    // https://github.com/storybookjs/storybook/issues/26291
    const { mergeConfig, loadConfigFromFile } = await import('vite');
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

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, 'package.json')));
}

export default storybookConfig;
