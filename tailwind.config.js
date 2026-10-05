/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F7F7F4',
        ink: {
          DEFAULT: '#15171C',
          muted: '#5B5E66',
        },
        signal: {
          DEFAULT: '#B8752E',
          soft: '#EADFCC',
        },
      },
      fontFamily: {
        serif: ['"IBM Plex Serif"', 'ui-serif', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}