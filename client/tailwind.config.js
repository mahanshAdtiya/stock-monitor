/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/component/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      display: ['Open Sans', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
    },
    extend: {
      backgroundColor: {
        'main-bg': '#DAE4EC',
        'hover_bg' :'#c7d4e2',
        'light-gray': '#F7F7F7',
      },
    },
  },
  plugins: [],
}

