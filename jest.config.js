const nextJest = require('next/jest');
const createJestConfig = nextJest({
  dir: './',
  testEnvironment: 'jsdom',
});

module.exports = createJestConfig();
