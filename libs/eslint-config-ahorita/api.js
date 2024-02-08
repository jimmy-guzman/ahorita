const { resolve } = require('node:path');

const cwd = process.cwd();
const project = [resolve(cwd, 'tsconfig.json')];

module.exports = {
  extends: ['jimmy-guzman', 'jimmy-guzman/typescript'],
  env: { node: true, es2020: true },
  parserOptions: { project },
  rules: {
    'new-cap': [
      'error',
      {
        capIsNewExceptions: [
          'Transform',
          'Decode',
          'Encode',
          'Partial',
          'Pick',
          'Union',
          'Literal',
        ],
      },
    ],
  },
};
