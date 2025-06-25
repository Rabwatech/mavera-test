/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2D5A4A',
          light: '#7A9B8A',
        },
        secondary: {
          DEFAULT: '#E8D5C4',
        },
        text: {
          primary: '#333333',
          secondary: '#666666',
        },
        background: {
          primary: '#FEFEFE',
          secondary: '#F8F8F8',
        },
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
      spacing: {
        'xs': '8px',
        'sm': '16px',
        'md': '24px',
        'lg': '32px',
        'xl': '48px',
        '2xl': '64px',
        '3xl': '96px',
        '4xl': '128px',
      },
      maxWidth: {
        'container': '1200px',
      },
    },
  },
  plugins: [],
} 