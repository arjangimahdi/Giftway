import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

import type { StorybookConfig } from '@storybook/react-vite';

import tsconfigPaths from 'vite-tsconfig-paths';
import { mergeConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

const config: StorybookConfig = {
  stories: ['../src/lib/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [],
  framework: {
    name: getAbsolutePath('@storybook/react-vite'),
    options: {},
  },

  // @storybook/react-vite already registers @vitejs/plugin-react; adding it
  // again duplicates the React Refresh preamble ("RefreshRuntime has already
  // been declared").
  viteFinal: async (config) =>
    mergeConfig(config, {
      plugins: [tailwindcss(), tsconfigPaths()],
    }),
};

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
