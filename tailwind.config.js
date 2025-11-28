/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10b981',
          dark: '#059669',
          light: '#34d399',
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        secondary: {
          DEFAULT: '#d1fae5',
          dark: '#a7f3d0',
        },
        dark: {
          DEFAULT: '#1f2937',
          light: '#374151',
        },
      },
      fontFamily: {
        'sans': ['System'],
        'body': ['System'],
      },
      borderRadius: {
        'card': '12px',
        'button': '10px',
      },
      boxShadow: {
        'sm': '0 2px 4px rgba(0,0,0,0.1)',
        'md': '0 4px 6px rgba(0,0,0,0.15)',
        'lg': '0 8px 12px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [],
}
