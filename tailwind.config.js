/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      darkBlue: "#204d88",
      white: "#ffffff",
    },
    screens: {},
    fontFamily: {
      Montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
}

