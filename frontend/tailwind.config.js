/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "pacific": ["Pacifico", 'sans-serif']
      },
      colors: {
        // Primary color palette
        'primary': {
          50: '#f0f9f9',
          100: '#e0f4f4',
          200: '#bfe9e9',
          300: '#99d9d9',
          400: '#66c9c9',
          500: '#0d9488',
          600: '#0d9488',
          700: '#0a7a6e',
          800: '#085d56',
          900: '#064e49',
        },
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        'fast': '200ms',
        'normal': '300ms',
        'slow': '500ms',
      },
    }
  },
  plugins: [],
}

