import { randomInt } from 'node:crypto';

export type TableRow = number[];

export abstract class BaseTable {
  protected id: number;

  protected rows: TableRow[];

  constructor(rows: TableRow[], id = randomInt(1)) {
    this.id = id;
    this.rows = rows;
  }

  public getId() {
    return this.id;
  }

  public equal(other: BaseTable) {
    return this.toGraphic() === other.toGraphic();
  }

  public toFlatList() {
    return this.rows.flat();
  }

  public toGraphic() {
    const graphic = [];

    for (const row of this.rows) {
      const formattedRow = row.map((i) => String(i).padStart(3).padEnd(3));

      graphic.push(`'| ${formattedRow.join(' | ')} |'`);
    }

    return graphic.join('\n');
  }

  public abstract rotateClockwise(): this;
}
