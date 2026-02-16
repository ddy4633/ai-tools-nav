/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: '.next',
  images: {
    unoptimized: true,
  },
  // 确保 standalone 输出到正确位置
  experimental: {
    outputFileTracingRoot: undefined,
  },
};

module.exports = nextConfig;
