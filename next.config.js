/** @type {import('next').NextConfig} */
const nextConfig = {
  // 使用标准输出而非 standalone
  distDir: '.next',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
