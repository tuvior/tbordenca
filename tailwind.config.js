/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Nord color palette
        nord: {
          // Polar Night (dark)
          0: '#2E3440', // nord0
          1: '#3B4252', // nord1
          2: '#434C5E', // nord2
          3: '#4C566A', // nord3
          // Snow Storm (light)
          4: '#D8DEE9', // nord4
          5: '#E5E9F0', // nord5
          6: '#ECEFF4', // nord6
          // Frost (blues)
          7: '#8FBCBB', // nord7
          8: '#88C0D0', // nord8
          9: '#81A1C1', // nord9
          10: '#5E81AC', // nord10
          // Aurora (accents)
          11: '#BF616A', // nord11 - red
          12: '#D08770', // nord12 - orange
          13: '#EBCB8B', // nord13 - yellow
          14: '#A3BE8C', // nord14 - green
          15: '#B48EAD', // nord15 - purple
        },
        // Map Nord colors to Tailwind naming convention
        primary: {
          50: '#F8FAFC',
          100: '#ECEFF4', // nord6
          200: '#E5E9F0', // nord5
          300: '#D8DEE9', // nord4
          400: '#81A1C1', // nord9
          500: '#5E81AC', // nord10
          600: '#4C566A', // nord3
          700: '#434C5E', // nord2
          800: '#3B4252', // nord1
          900: '#2E3440', // nord0
          950: '#272C36',
        },
        secondary: {
          50: '#F8FAFC',
          100: '#ECEFF4', // nord6
          200: '#E5E9F0', // nord5
          300: '#D8DEE9', // nord4
          400: '#9AA4BC',
          500: '#81A1C1', // nord9
          600: '#5E81AC', // nord10
          700: '#4C566A', // nord3
          800: '#434C5E', // nord2
          900: '#3B4252', // nord1
          950: '#2E3440', // nord0
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
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
        '128': '32rem',
        '144': '36rem',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
    },
  },
  plugins: [],
};
