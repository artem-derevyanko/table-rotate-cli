import { BaseTable, TableRow } from '../base/base.table';
import { InvalidTable } from '../invalid/invalid.table';

import { SquareTableClockwiseIterator } from './clockwise.iterator';

import { chunkBy } from '../../../common/utils/arrays.utils';
import { ValidationError } from '../../../common/errors/validation.error';

export class SquareTable extends BaseTable {
  public static fromFlatList(list: TableRow, id?: number) {
    try {
      const size = SquareTable.getSize(list);
      const rows = chunkBy(list, size);

      return new SquareTable(rows, id);
    } catch (error) {
      return new InvalidTable(error as Error, id);
    }
  }

  public static fromGraphic(graphic: string, id?: number) {
    const list = graphic
      .trim()
      .split('\n')
      .flatMap((row) =>
        row
          .replace(/\s/g, '')
          .slice(1, -1)
          .split('|')
          .map((value) => Number.parseFloat(value)),
      );

    return this.fromFlatList(list, id);
  }

  private static getSize(list: TableRow | TableRow[]) {
    const size = Math.sqrt(list.flat().length);
    if (size < 0 || !Number.isInteger(size)) {
      throw new ValidationError(
        'Expected the square table has the same number of rows and columns',
      );
    }

    return size;
  }

  public getCell(rowNumber: number, columnNumber: number) {
    return this.rows[rowNumber]?.[columnNumber] ?? null;
  }

  public setCell(rowNumber: number, columnNumber: number, value: number) {
    if (this.getCell(rowNumber, columnNumber) === null) {
      throw new Error('Invalid cell access');
    }

    // @ts-ignore: We already check it above
    this.rows[rowNumber][columnNumber] = value;
  }

  public rotateClockwise() {
    let prevValue: number | null = null;

    for (const { row, column } of this.clockwiseIterator()) {
      const value = this.getCell(row, column);

      if (prevValue === null) {
        prevValue = value;

        continue;
      }

      this.setCell(row, column, prevValue);

      prevValue = value;
    }

    return this;
  }

  public clockwiseIterator() {
    const size = SquareTable.getSize(this.rows);

    return {
      [Symbol.iterator]: () => {
        return new SquareTableClockwiseIterator(size);
      },
    };
  }
}
