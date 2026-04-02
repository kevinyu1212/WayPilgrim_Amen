/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sanctuary-white': '#F8F9FA',
        'grace-blue': '#1A237E',
        'warm-sand': '#F5F5DC',
      },
      fontFamily: {
        'sacred': ['Noto Serif KR', 'serif'],
        'sans': ['Pretendard', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
