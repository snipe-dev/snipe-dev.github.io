/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          cyan: '#22d3ee',
          magenta: '#c026d3',
          purple: '#a855f7',
        }
      }
    }
  },
  plugins: [],
}
