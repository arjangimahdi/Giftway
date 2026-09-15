import next from '@next/eslint-plugin-next';
import nx from '@nx/eslint-plugin';
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...nx.configs['flat/react-typescript'],
  next.configs['core-web-vitals'],
  {
    ignores: ['.next/**', 'next-env.d.ts', 'out-tsc/**'],
  },
];
