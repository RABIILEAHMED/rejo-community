/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        bounceIn: {
          '0%': {
            transform: 'scale(0.9)',
            opacity: '0',
          },
          '60%': {
            transform: 'scale(1.05)',
            opacity: '1',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        'gradient-move': 'gradientMove 4s ease infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'bounce-in': 'bounceIn 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};
