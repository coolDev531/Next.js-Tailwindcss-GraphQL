/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@tremor/react'],
  },
};

module.exports = nextConfig;
