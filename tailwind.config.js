module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Dongle: ['Dongle', "sans-serif"]
      }
    },
  },
  plugins: ["@tailwindcss/forms"],
}
