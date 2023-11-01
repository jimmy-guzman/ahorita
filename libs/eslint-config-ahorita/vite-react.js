const { resolve } = require('node:path');

const cwd = process.cwd();
const project = [
  resolve(cwd, 'tsconfig.json'),
  resolve(cwd, 'tsconfig.node.json'),
];

module.exports = {
  extends: ['./base.js', 'plugin:react-hooks/recommended'],
  env: { browser: true, es2020: true },
  globals: { JSX: true },
  plugins: ['react-refresh'],
  parserOptions: { project },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
