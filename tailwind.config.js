/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dark-desktop': "url('../public/images/bg-desktop-dark.jpg')",
        'dark-mobile': "url('../public/images/bg-mobile-dark.jpg')",
        'light-desktop': "url('../public/images/bg-desktop-light.jpg')",
        'light-mobile': "url('../public/images/bg-mobile-light.jpg')",
      },
    },
  },
  plugins: [],
  darkMode: "class",
}
