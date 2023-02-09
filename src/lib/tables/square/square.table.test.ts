import { SquareTable } from './square.table';
import { InvalidTable } from '../invalid/invalid.table';

it.each([[[]], [[5]], [[1, 2, 3, 4]], [[1, 2, 3, 4, 5, 6, 7, 8, 9]]])(
  'should create a table with the correct number of elements from flat list',
  (items) => {
    expect(SquareTable.fromFlatList(items)).toBeInstanceOf(SquareTable);
  },
);

it.each([[[1, 2]], [[1, 2, 3]], [[1, 2, 3, 4, 5]], [[1, 2, 3, 4, 5, 6, 7]]])(
  'should be an error in creating a table with the wrong number of elements from flat list',
  (items) => {
    expect(SquareTable.fromFlatList(items)).toBeInstanceOf(InvalidTable);
  },
);

it('should rotate table with 1x1 size', () => {
  const table = SquareTable.fromGraphic('| 1 |');

  const rotatedTable = table.rotateClockwise();

  const expectedTable = SquareTable.fromGraphic('| 1 |');
  expect(rotatedTable.equal(expectedTable)).toBeTruthy();
});

it('should rotate table with 2x2 size', () => {
  const table = SquareTable.fromGraphic(`
    | 11 | 12 |
    | 13 | 14 |
  `);

  const rotatedTable = table.rotateClockwise();

  const expectedTable = SquareTable.fromGraphic(`
    | 13 | 11 |
    | 14 | 12 |
  `);
  expect(rotatedTable.equal(expectedTable)).toBeTruthy();
});

it('should rotate table with 3x3 size', () => {
  const table = SquareTable.fromGraphic(`
    | 1 | 2 | 3 |
    | 3 | 5 | 6 |
    | 7 | 8 | 9 |
  `);

  const rotatedTable = table.rotateClockwise();

  const expectedTable = SquareTable.fromGraphic(`
    | 3 | 1 | 2 |
    | 7 | 5 | 3 |
    | 8 | 9 | 6 |
  `);
  expect(rotatedTable.equal(expectedTable)).toBeTruthy();
});

it('should rotate table with 4x4 size', () => {
  const table = SquareTable.fromGraphic(`
    |  1 |  2 |  3 |  4 |
    |  5 |  6 |  7 |  8 |
    |  9 | 10 | 11 | 12 |
    | 13 | 14 | 15 | 16 |
  `);

  const rotatedTable = table.rotateClockwise();

  const expectedTable = SquareTable.fromGraphic(`
    |  5 |  1 |  2 |  3 |
    |  9 | 10 |  6 |  4 |
    | 13 | 11 |  7 |  8 |
    | 14 | 15 | 16 | 12 |
  `);
  expect(rotatedTable.equal(expectedTable)).toBeTruthy();
});

it('should rotate table with 5x5 size', () => {
  const table = SquareTable.fromGraphic(`
    |  1 |  2 |  3 |  4 |  5 |
    |  6 |  7 |  8 |  9 | 10 |
    | 11 | 12 | 13 | 14 | 15 |
    | 16 | 17 | 18 | 19 | 20 |
    | 21 | 22 | 23 | 24 | 25 |
  `);

  const rotatedTable = table.rotateClockwise();

  const expectedTable = SquareTable.fromGraphic(`
    |  6 |  1 |  2 |  3 |  4 |
    | 11 | 12 |  7 |  8 | 5 |
    | 16 | 17 | 13 |  9 | 10 |
    | 21 | 18 | 19 | 14 | 15 |
    | 22 | 23 | 24 | 25 | 20 |
  `);
  expect(rotatedTable.equal(expectedTable)).toBeTruthy();
});

it('should rotate table with 6x6 size', () => {
  const table = SquareTable.fromGraphic(`
    |  1 |  2 |  3 |  4 |  5 |  6 |
    |  7 |  8 |  9 | 10 | 11 | 12 |
    | 13 | 14 | 15 | 16 | 17 | 18 |
    | 19 | 20 | 21 | 22 | 23 | 24 |
    | 25 | 26 | 27 | 28 | 29 | 30 |
    | 31 | 32 | 33 | 34 | 35 | 36 |
  `);

  const rotatedTable = table.rotateClockwise();

  const expectedTable = SquareTable.fromGraphic(`
    |  7 |  1 |  2 |  3 |  4 |  5 |
    | 13 | 14 |  8 |  9 | 10 |  6 |
    | 19 | 20 | 21 | 15 | 11 | 12 |
    | 25 | 26 | 22 | 16 | 17 | 18 |
    | 31 | 27 | 28 | 29 | 23 | 24 |
    | 32 | 33 | 34 | 35 | 36 | 30 |
  `);

  expect(rotatedTable.equal(expectedTable)).toBeTruthy();
});

it('should rotate table with 11x11 size', () => {
  const table = SquareTable.fromGraphic(`
    |   1 |  2 |  3 |   4 |  5 |  6 |  7 |  8 |  9 | 10 |  11 |
    |  12 | 13 | 14 |  15 | 16 | 17 | 18 | 19 | 20 | 21 |  22 |
    |  41 | 35 | 12 |   6 |  0 | 99 | -5 |  3 | -9 | 70 | 111 |
    |   3 | 12 | -5 | -33 |  1 | 11 |  0 |  1 | 10 | 99 |   9 |
    |   9 | 33 | 11 |   0 | 88 |  9 | 72 | 12 | 22 | 91 |  39 |
    |   0 | 91 | 47 |  -5 |  7 | 11 |  9 | 81 | 18 | 29 |  91 |
    |  -8 | 14 | 81 |  71 | 57 |  8 | 41 | 90 | 78 | -1 |   0 |
    |  -8 |  3 | 40 | 123 | 45 |  1 | 34 | 91 | 12 |  9 | 192 |
    |   7 |  6 | 31 |  39 | 12 |  1 | 23 | 47 | 50 | 10 | 123 |
    | 140 | 45 |  9 |  33 | 11 |  5 |  8 | 91 | 89 | 88 |  86 |
    |   1 |  2 | -2 |  42 | 12 | 13 | 14 | 66 | 39 | 42 |  75 |
  `);

  const rotatedTable = table.rotateClockwise();

  const expectedTable = SquareTable.fromGraphic(`
    |  12 |  1 |  2 |   3 |   4 |  5 |  6 |  7 |  8 |  9 |  10 |
    |  41 | 35 | 13 |  14 |  15 | 16 | 17 | 18 | 19 | 20 |  11 |
    |   3 | 12 | -5 |  12 |   6 |  0 | 99 | -5 |  3 | 21 |  22 |
    |   9 | 33 | 11 |   0 | -33 |  1 | 11 |  0 | -9 | 70 | 111 |
    |   0 | 91 | 47 |  -5 |   7 | 88 |  9 |  1 | 10 | 99 |   9 |
    |  -8 | 14 | 81 |  71 |  57 | 11 | 72 | 12 | 22 | 91 |  39 |
    |  -8 |  3 | 40 | 123 |   8 | 41 |  9 | 81 | 18 | 29 |  91 |
    |   7 |  6 | 31 |  45 |   1 | 34 | 91 | 90 | 78 | -1 |   0 |
    | 140 | 45 | 39 |  12 |   1 | 23 | 47 | 50 | 12 |  9 | 192 |
    |   1 |  9 | 33 |  11 |   5 |  8 | 91 | 89 | 88 | 10 | 123 |
    |   2 | -2 | 42 |  12 |  13 | 14 | 66 | 39 | 42 | 75 |  86 |
  `);
  expect(rotatedTable.equal(expectedTable)).toBeTruthy();
});
