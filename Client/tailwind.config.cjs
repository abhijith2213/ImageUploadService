/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth-bg': "url('./assets/bg-login.jpg')",
      }
    },
  },
  plugins: [],
}
