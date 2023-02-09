import { BaseTable } from '../base/base.table';

export class InvalidTable extends BaseTable {
  /**
   * If we want to know a reason in future
   */
  private reason: Error;

  constructor(reason: Error, id?: number) {
    super([], id);

    this.reason = reason;
  }

  public rotateClockwise(): this {
    return this;
  }
}
