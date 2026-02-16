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
        // 背景色
        bg: {
          primary: '#F5F1EB',
          secondary: '#FAF8F5',
          card: '#FFFFFF',
        },
        // 文字色
        text: {
          primary: '#2C2420',
          secondary: '#6B5E55',
          muted: '#9B8B7B',
        },
        // 强调色
        accent: {
          warm: '#D4825A',
          'warm-hover': '#B86D45',
          cool: '#4A5D4E',
          'cool-hover': '#3D4D40',
        },
        // 边框
        border: {
          light: '#E8E2D9',
          medium: '#D4CFC4',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans SC', 'sans-serif'],
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(44, 36, 32, 0.06)',
        'hover': '0 4px 16px rgba(44, 36, 32, 0.1)',
      },
    },
  },
  plugins: [],
};
