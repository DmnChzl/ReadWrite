require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'avoid',
        bracketSameLine: true,
        printWidth: 120,
        singleQuote: true,
        trailingComma: 'none'
      }
    ]
  }
};
