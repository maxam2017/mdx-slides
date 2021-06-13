const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  purge: [
    './(pages|components|context)/**/*.{js,ts,jsx,tsx}',
    './markdown/**/*.{mdx,md}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
    },
    extend: {},
  },
  variants: {
    scrollSnapType: ['responsive'],
  },
};
