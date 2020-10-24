const path = require('path');
const { BABEL_CONFIG_PATH, CONFIG_PATH } = require('..');
const moduleAliases = require('../../util/moduleAliases');

const moduleNameMapper = moduleAliases.absolute.reduce(
  (aliases, [name, file]) => Object.assign(aliases, { [`^${name}$`]: file }),
  {}
);

module.exports = (options = {}) => ({
  clearMocks: true,
  moduleNameMapper,
  rootDir: '.',
  roots: ['<rootDir>'],
  setupFilesAfterEnv: [path.join(CONFIG_PATH, 'jest/jest.setup.js')],
  testEnvironment: 'node',
  testMatch: ['**/*/(spec|test).js', '**/*.(spec|test).js'],
  transform: {
    '\\.js$': ['babel-jest', { configFile: BABEL_CONFIG_PATH }],
  },
  ...options,
});
