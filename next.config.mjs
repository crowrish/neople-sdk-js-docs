import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath: '/neople-sdk-js-docs',
  assetPrefix: '/neople-sdk-js-docs',
  images: {
    unoptimized: true,
  },
  // Note: async redirects() doesn't work with static export
  // Use client-side redirects or meta refresh if needed
};

export default withMDX(config);
