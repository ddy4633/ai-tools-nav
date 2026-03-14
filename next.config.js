const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
  distDir: '.next',
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    unoptimized: true,
  },
  // 性能优化
  poweredByHeader: false,
  compress: true,
  // 实验性功能
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

module.exports = nextConfig;
