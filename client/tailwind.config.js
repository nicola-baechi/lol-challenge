/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: false,
    base: false,
  },
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          950: '#18181b',
        },
      },
      fontFamily: {
        hind: ['Hind', 'sans-serif'],
        heebo: ['Heebo', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
};
