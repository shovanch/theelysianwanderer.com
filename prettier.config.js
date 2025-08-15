/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */

const config = {
  singleQuote: true,
  semi: true,
  trailingComma: 'all',
  jsxSingleQuote: false,
  arrowParens: 'always',
  endOfLine: 'auto',
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
