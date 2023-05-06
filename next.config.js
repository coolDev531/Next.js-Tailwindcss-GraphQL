/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.weatherbit.io'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@tremor/react'],
  },
};

module.exports = nextConfig;
