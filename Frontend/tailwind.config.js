/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",

    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/elements/**/*.{js,ts,jsx,tsx}",
  ],
  // eslint-disable-next-line global-require
  plugins: [require("flowbite/plugin")],
  mode: "jit",
};
