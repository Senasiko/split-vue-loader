const path = require('path');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    'airbnb-base'
  ],
  plugins: [
    '@typescript-eslint'
  ],
}
