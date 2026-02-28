/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: '.next',
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
