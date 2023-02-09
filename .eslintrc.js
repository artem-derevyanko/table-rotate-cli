module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'airbnb-typescript/base',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:import/typescript',
    'plugin:unicorn/recommended',
    // Next lines to disable conflicting rules with Prettier
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'jest.config.js'],

  rules: {
    '@typescript-eslint/member-ordering': ['error'],

    indent: 'off',
    quotes: ['error', 'single', { avoidEscape: true }],
    'linebreak-style': ['error', 'unix'],

    // Use function hoisting to improve code readability
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],

    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': [
      'off',
      { allowTypedFunctionExpressions: true },
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-redeclare': ['error', { ignoreDeclarationMerge: true }],
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],

    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
        overrides: {
          accessors: 'no-public',
          constructors: 'no-public',
        },
      },
    ],

    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',

    'no-console': ['warn'],
    'eol-last': ['error', 'always'],
    // Common abbreviations are known and readable
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/no-array-method-this-argument': 'off',
    'unicorn/no-array-callback-reference': 'off',
    // https://www.elsewebdevelopment.com/typescript-airbnb-style-guide-optimized-for-prettier-in-one-json-file/
    // Limit Cyclomatic Complexity
    complexity: ['error', 13],
    // Enforce a maximum depth that blocks can be nested
    'max-depth': ['error', 4],
    // Enforce a maximum file length
    'max-lines': [
      'error',
      {
        max: 300,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    // Enforce a maximum function length
    'max-lines-per-function': [
      'error',
      {
        max: 50,
        skipBlankLines: true,
        skipComments: true,
        IIFEs: true,
      },
    ],
    // Enforce a maximum depth that callbacks can be nested
    'max-nested-callbacks': ['error', 3],
    // Enforce a maximum number of parameters in function definitions
    'max-params': ['error', 5],
    // Enforce a maximum number of statements allowed per block
    'max-statements': ['error', 25],
    // Enforce a maximum number of statements allowed per line
    'max-statements-per-line': 2,

    'func-style': ['error', 'expression'],

    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],

    '@typescript-eslint/adjacent-overload-signatures': ['off'],
  },
};
