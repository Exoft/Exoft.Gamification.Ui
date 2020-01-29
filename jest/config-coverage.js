const config = require('./config.js');

module.exports = {
  ...config,
  collectCoverage: true,
  collectCoverageFrom: ['src/app/**/*.ts'],
  coverageReporters: ['lcov', 'html'],
};
