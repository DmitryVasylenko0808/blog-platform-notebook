/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        notebook: {
          100: "#F2F8F7",
          200: "#E8F3F3",
          250: "#94D7D3",
          300: "#00AAA1"
        },
        skeleton: "#c4c4c4"
      },
      padding: {
        25: "100px"
      }
    },
  },
  plugins: [],
}

