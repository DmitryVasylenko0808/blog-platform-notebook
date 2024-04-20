/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        notebook: {
          100: "#E8F3F3",
          300: "#00AAA1"
        }
      },

    },
  },
  plugins: [],
}

