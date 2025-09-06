/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'facebook': {
          DEFAULT: '#1877F2',
          'dark': '#166FE5',
          'light': '#E7F3FF',
        },
        'gray': {
          'light': '#F0F2F5',
          'medium': '#65676B',
          'dark': '#050505',
        }
      },
      fontFamily: {
        'sans': ['Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}