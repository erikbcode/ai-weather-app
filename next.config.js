/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.weatherbit.io'],
    loaders: {
      'png': 'image-webpack-loader',
    },
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@tremor/react"]
  }
};

module.exports = nextConfig;
