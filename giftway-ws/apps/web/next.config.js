//@ts-check
const path = require('node:path');

const workspaceRoot = path.join(__dirname, '../..');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // ui and tokens export raw TypeScript, so Next has to compile them.
  transpilePackages: ['@giftway-ws/ui', '@giftway-ws/tokens'],
  outputFileTracingRoot: workspaceRoot,
  turbopack: { root: workspaceRoot },
  // tsconfig.json is a references-only file managed by `nx sync`.
  typescript: { tsconfigPath: 'tsconfig.app.json' },
};

module.exports = nextConfig;
