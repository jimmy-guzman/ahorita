const { resolve } = require('node:path');

const cwd = process.cwd();
const project = [
  resolve(cwd, 'tsconfig.json'),
  resolve(cwd, 'tsconfig.node.json'),
  resolve(cwd, 'tsconfig.e2e.json'),
];

module.exports = {
  extends: ['jimmy-guzman', 'jimmy-guzman/react', 'jimmy-guzman/typescript'],
  plugins: ['react-refresh'],
  parserOptions: { project },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: {
        '@typescript-eslint/no-misused-promises': [
          2,
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],
      },
    },
  ],
};
