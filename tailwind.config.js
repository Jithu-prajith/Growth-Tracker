/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: '#090d16',
        surface: {
          dark: '#0b1120',
          card: '#111827',
          border: '#1f293d',
          hover: '#1a2436'
        },
        accent: {
          blue: '#38bdf8',
          emerald: '#10b981',
          teal: '#14b8a6',
          purple: '#a855f7',
          amber: '#f59e0b',
          rose: '#f43f5e'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
