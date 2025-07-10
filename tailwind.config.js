module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        'surface-1': '#121212',
        'surface-2': '#282828',
        primary: '#ffffff',
        secondary: '#a8a8a8',
        accent: '#3797f0',
      },
    },
  },
  plugins: [],
};