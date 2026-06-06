/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 背景色 - 编辑感深色主题
        bg: {
          primary: '#070a10',
          secondary: '#0d121c',
          card: '#141b27',
          hover: '#202a38',
          code: '#0b1018',
        },
        // 文字色
        text: {
          primary: '#fff5e8',
          secondary: '#d4cab9',
          muted: '#948879',
          accent: '#7de2d4',
        },
        // 表面色 - 用于卡片背景
        surface: {
          base: '#10151f',
          card: '#141b27',
        },
        // 强调色
        accent: {
          cyan: '#7de2d4',
          pink: '#f09a79',
          purple: '#8ea2ff',
          yellow: '#f0c979',
          warm: '#ff9163',
          cool: '#56b8aa',
          'warm-hover': '#ffad86',
        },
        // 边框
        border: {
          subtle: 'rgba(244, 239, 230, 0.08)',
          glow: 'rgba(125, 226, 212, 0.26)',
          card: 'rgba(244, 239, 230, 0.1)',
          light: 'rgba(244, 239, 230, 0.14)',
          medium: 'rgba(244, 239, 230, 0.18)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'SF Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(125, 226, 212, 0.24)',
        'glow-purple': '0 0 20px rgba(142, 162, 255, 0.2)',
        'glow-pink': '0 0 20px rgba(240, 154, 121, 0.2)',
        'card': '0 10px 32px rgba(0, 0, 0, 0.24)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(125, 226, 212, 0.24)' },
          '50%': { boxShadow: '0 0 40px rgba(125, 226, 212, 0.35)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(120deg, #fff5e8 4%, #7de2d4 44%, #f0c979 70%, #f09a79 100%)',
        'gradient-heat': 'linear-gradient(135deg, #f09a79 0%, #f0c979 100%)',
        'gradient-dark': 'linear-gradient(180deg, #070a10 0%, #0d121c 100%)',
      },
    },
  },
  plugins: [],
};
