module.exports = {
  printWidth: 100,
  tabWidth: 2,
  semi: true,
  bracketSpacing: true,
  singleQuote: false,
  overrides: [
    {
      files: '*.js',
      options: {
        singleQuote: true
      }
    }
  ]
};
