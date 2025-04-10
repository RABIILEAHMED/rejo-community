/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Dark mode activated via class (e.g. <html class="dark">)
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#f7ba34',
        secondary: '#69a79c',
        light: '#f7f7f7',
        dark: '#333333',
        dark2: '#999999',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      keyframes: {
        gradientMove: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'gradient-move': 'gradientMove 4s ease infinite',
      },
    },
  },
  plugins: [],
};
