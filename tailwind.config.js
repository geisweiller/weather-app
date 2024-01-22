/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "dark-blue": "#204d88",
      "light-blue": "#678fc0",
      white: "#ffffff",
      "bg-white": "#fefefe",
      "bg-blue": "#00a4e4",
      black: "#000000",
      transparent: "transparent",
      gray: "#808080",
      "light-gray": "#f2f2f2",
    },

    fontFamily: {
      Montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
}


