const { resolve } = require('node:path');

const cwd = process.cwd();
const project = [resolve(cwd, 'tsconfig.json')];

module.exports = {
  extends: ['./base.js'],
  env: { node: true, es2020: true },
  parserOptions: { project },
};
