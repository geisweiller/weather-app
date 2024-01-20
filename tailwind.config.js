/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "dark-blue": "#204d88",
      white: "#ffffff",
      "bg-white": "#fefefe",
      "bg-blue": "#00a4e4",
      black: "#000000",
    },
    screens: {},
    fontFamily: {
      Montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
}


