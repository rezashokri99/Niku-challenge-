/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"IRANSansX"', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'input': '0 2px 4px -2px rgba(16, 24, 40, 0.06)',
      },
    },
  },
  plugins: [],
}