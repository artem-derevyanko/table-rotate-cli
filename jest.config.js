module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '(\\.|/)(test|spec)\\.ts$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
};
