/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.weatherbit.io', 'i.imgur.com'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@tremor/react'],
  },
};

module.exports = nextConfig;
