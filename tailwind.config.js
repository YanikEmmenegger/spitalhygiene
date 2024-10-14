/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            lightGreen: '#009870',
            DarkGreen: '#00654a',
            lightRed: '#cd0601',
            darkRed: '#9E080C',
            lightGray: '#677078',
            darkGray: '#4B5457', // New dark gray color
        },
    },
  },
  plugins: [],
}