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
        // 背景色 - Cyberpunk深色主题
        bg: {
          primary: '#0a0a0f',
          secondary: '#12121a',
          card: '#1a1a2e',
          hover: '#252542',
          code: '#0d1117',
        },
        // 文字色
        text: {
          primary: '#ffffff',
          secondary: '#a0a0b0',
          muted: '#6b6b80',
          accent: '#00f5d4',
        },
        // 表面色 - 用于卡片背景
        surface: {
          base: '#12121a',
          card: '#1a1a2e',
        },
        // 霓虹强调色
        accent: {
          cyan: '#00f5d4',
          pink: '#ff006e',
          purple: '#8338ec',
          yellow: '#ffbe0b',
          warm: '#ff6b35',
          cool: '#00d4aa',
          'warm-hover': '#ff8555',
        },
        // 边框
        border: {
          subtle: 'rgba(255, 255, 255, 0.1)',
          glow: 'rgba(0, 245, 212, 0.3)',
          card: 'rgba(255, 255, 255, 0.08)',
          light: 'rgba(255, 255, 255, 0.1)',
          medium: 'rgba(255, 255, 255, 0.15)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'SF Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 245, 212, 0.3)',
        'glow-purple': '0 0 20px rgba(131, 56, 236, 0.3)',
        'glow-pink': '0 0 20px rgba(255, 0, 110, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 245, 212, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 245, 212, 0.5)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #00f5d4 0%, #8338ec 100%)',
        'gradient-heat': 'linear-gradient(135deg, #ff006e 0%, #ffbe0b 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0a0a0f 0%, #12121a 100%)',
      },
    },
  },
  plugins: [],
};
