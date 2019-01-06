module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-trailing-spaces' : 0,
    'indent': 0,
    'no-tabs': 0,
    'no-mixed-spaces-and-tabs': 0,
    'space-before-function-paren': ["error", {"anonymous": "always", "named": "never", "asyncArrow": "always" }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};
