/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '111': '32rem',
        '222': `${2.5 * 8}rem`,
      }
    },
  },
  plugins: [],
}

