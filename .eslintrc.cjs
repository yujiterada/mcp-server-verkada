module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // Allow unused vars with underscore prefix
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
    }],
    // Allow any type (common in generated code)
    '@typescript-eslint/no-explicit-any': 'off',
    // Allow require imports
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    // Allow empty functions
    '@typescript-eslint/no-empty-function': 'off',
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '*.backup',
    '*.js',
    '*.cjs',
    '*.mjs',
  ],
};
