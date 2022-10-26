/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/elements/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "blueberry-800": "#283347",
      "blueberry-600": "#586c91",
      "blueberry-500": "#8fa4c3",
      "blueberry-200": "#dfe7f2",
      "blueberry-100": "#f4f7fc",
    },
  },
  plugins: [],
  mode: "jit",
};
