// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
const prettierTailwind = require("prettier-plugin-tailwindcss");

// prettier.config.js
module.exports = {
  plugins: [prettierTailwind],
  tailwindConfig: "./tailwind.config.js",
};
