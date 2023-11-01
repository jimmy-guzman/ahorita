const { resolve } = require('node:path');

const cwd = process.cwd();
const project = [
  resolve(cwd, 'tsconfig.json'),
  resolve(cwd, 'tsconfig.node.json'),
];

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  globals: {
    JSX: true,
  },
  plugins: ['simple-import-sort'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: { project },
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
  },
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
      files: ['./**/*.{js,cjs}'],
    },
  ],
  ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js'],
};
