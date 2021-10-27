module.exports = {
  root: true,
  extends: '@react-native-community',
  env: {
    browser: true
  },
  extends: [
    'plugin:vue/essential',
    'standard',
    'prettier'
  ],
  plugins: ['vue', 'prettier'],
  rules: {
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': 'error'
  }
};
