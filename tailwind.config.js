/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        nord: {
          0: '#2E3440',
          1: '#3B4252',
          2: '#434C5E',
          3: '#4C566A',
          4: '#D8DEE9',
          5: '#E5E9F0',
          6: '#ECEFF4',
          7: '#8FBCBB',
          8: '#88C0D0',
          9: '#81A1C1',
          10: '#5E81AC',
          11: '#BF616A',
          12: '#D08770',
          13: '#EBCB8B',
          14: '#A3BE8C',
          15: '#B48EAD',
        },
        primary: {
          50: '#F8FAFC',
          100: '#ECEFF4',
          200: '#E5E9F0',
          300: '#D8DEE9',
          400: '#81A1C1',
          500: '#5E81AC',
          600: '#4C566A',
          700: '#434C5E',
          800: '#3B4252',
          900: '#2E3440',
          950: '#272C36',
        },
        secondary: {
          50: '#F8FAFC',
          100: '#ECEFF4',
          200: '#E5E9F0',
          300: '#D8DEE9',
          400: '#9AA4BC',
          500: '#81A1C1',
          600: '#5E81AC',
          700: '#4C566A',
          800: '#434C5E',
          900: '#3B4252',
          950: '#2E3440',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-poppins)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      transitionDuration: {
        2000: '2000ms',
      },
    },
  },
  plugins: [],
};
