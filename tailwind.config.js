/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,js,ts,jsx,tsx,mdx}',
    './public/**/*.html',
  ],
  safelist: ['text-primary-500'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eaf0fe',
          100: '#dbe6fd',
          200: '#b8cefb',
          300: '#8bb0f8',
          400: '#5a8cf5',
          500: '#3F6FEE', // Brand
          600: '#2251d1',
          700: '#1c3fa2',
          800: '#19357c',
          900: '#182f62',
        },
        accent: '#FF6B6B',
        secondary: '#A0C4FF',
        bg: '#F7F9FC',
        border: '#DCE3F2',
        text: '#1C1C1E',
        alert: '#FFE156',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
