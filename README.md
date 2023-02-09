# Table Rotate CLI

This CLI program takes as input a CSV in a certain format, converts the input data into square tables (if possible) and rotates those tables clockwise. The result is sent to the standard output stream.

- [Table Rotate CLI](#table-rotate-cli)
  - [Requirements](#requirements)
  - [How to build](#how-to-build)
  - [How to use](#how-to-use)
    - [Samples](#samples)
  - [Tests](#tests)
  - [Others](#others)
    - [Local Development](#local-development)

## Requirements

Before running this project, you need to have the following:

- `Node.js` (`v18.14.0`+)
- `yarn` >= `v1.22.19`

## How to build

In order to use this program, first you need to build it:

1. Clone repo.
2. Run `yarn` to install dependencies.
3. Run `yarn build` to build TS code.

## How to use

The program has the following interface:

```bash
  node build/cli.js <input file>
```

The result is sent to the standard output stream.

### Samples

In the `samples` directory you can find some CSV files that are ready to use:

```bash
  node build/cli.js samples/example.csv > output.csv
```

## Tests

The code has some unit tests for crucial parts - input validation and table transformation. You can run them using the following command:

```bash
  yarn test
```

## Others

### Local Development

If you want to play around with code:

1. Clone repo.
2. Run `yarn`.
3. Run `yarn start:dev` to watch code changes during development.

You also can use the predefined [Samples](#samples) and [Tests](#tests).
