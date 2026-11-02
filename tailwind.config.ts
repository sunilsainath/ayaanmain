import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#f6efdc',
        slate: { 50: '#f3ecdd' },
        navy: {
          800: '#0f2447',
          900: '#0b1d3a',
        },
        amber: '#f59e0b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 14px 40px rgba(15, 36, 71, 0.14)',
        card: '0 2px 0 rgba(15, 36, 71, 0.06), 0 10px 24px rgba(15, 36, 71, 0.12)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      }
    },
  },
  plugins: [],
};
export default config;
