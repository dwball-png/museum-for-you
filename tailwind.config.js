module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'opal': '#C5DBD0',
        'eggshell': '#E7E2CD',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
