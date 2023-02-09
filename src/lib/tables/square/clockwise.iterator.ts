interface SquareTableClockwiseIteratorValue {
  row: number;

  column: number;
}

interface SquareTableClockwiseIteratorResult {
  value: SquareTableClockwiseIteratorValue;

  done: boolean;
}

export class SquareTableClockwiseIterator {
  private readonly tableSize: number;

  private currentRow: number | null = null;

  private currentColumn: number | null = null;

  private prevRow: number | null = null;

  private prevColumn: number | null = null;

  private startCursor = 0;

  constructor(tableSize: number) {
    this.tableSize = tableSize;

    this.resetMovement();
  }

  get isFinished() {
    return this.endCursor - this.startCursor <= 1;
  }

  private get endCursor() {
    return this.tableSize - this.startCursor;
  }

  public next(): SquareTableClockwiseIteratorResult {
    if (this.isFinished) {
      return { done: true } as SquareTableClockwiseIteratorResult;
    }

    if (this.isMovementStarted()) {
      this.moveForward();
    } else {
      this.startMove();
    }

    [this.prevColumn, this.prevRow] = [this.currentColumn, this.currentRow];

    return this.getIterationResult();
  }

  private getIterationResult(): SquareTableClockwiseIteratorResult {
    if (this.currentColumn === null || this.currentRow === null) {
      const stepStart = this.startCursor - 1;

      return {
        value: { row: stepStart, column: stepStart },
        done: false,
      };
    }

    return {
      value: { row: this.currentRow, column: this.currentColumn },
      done: false,
    };
  }

  private isMovementStarted() {
    return this.currentRow !== null && this.currentColumn !== null;
  }

  private isStartPosition() {
    return this.currentRow === this.startCursor && this.currentColumn === this.startCursor;
  }

  private isNeedMoveRight() {
    return this.prevRow === this.startCursor;
  }

  private isNeedMoveBottom() {
    return this.prevColumn === this.endCursor - 1;
  }

  private isNeedMoveLeft() {
    return this.prevRow === this.endCursor - 1;
  }

  private isNeedMoveUp() {
    return this.prevColumn === this.startCursor;
  }

  private startMove() {
    this.currentRow = this.currentColumn = this.startCursor;
  }

  private moveForward() {
    if (this.isNeedMoveRight()) {
      this.moveRight();
    } else if (this.isNeedMoveBottom()) {
      this.moveBottom();
    } else if (this.isNeedMoveLeft()) {
      this.moveLeft();
    } else if (this.isNeedMoveUp()) {
      this.moveUp();
    }
  }

  private moveRight() {
    if (this.currentColumn === null || this.currentRow === null) {
      return;
    }

    this.currentColumn++;

    if (this.isNeedMoveBottom()) {
      this.moveBottom();
    }
  }

  private moveBottom() {
    if (this.currentColumn === null || this.currentRow === null) {
      return;
    }

    this.currentRow++;
    this.currentColumn = this.endCursor - 1;

    if (this.isNeedMoveLeft()) {
      this.moveLeft();
    }
  }

  private moveLeft() {
    if (this.currentColumn === null || this.currentRow === null) {
      return;
    }

    this.currentColumn--;
    this.currentRow = this.endCursor - 1;

    if (this.isNeedMoveUp()) {
      this.moveUp();
    }
  }

  private moveUp() {
    if (this.currentColumn === null || this.currentRow === null) {
      return;
    }

    this.currentRow--;
    this.currentColumn = this.startCursor;

    if (this.isStartPosition()) {
      this.moveDeeper();
    }
  }

  private moveDeeper() {
    this.startCursor++;
    this.resetMovement();
  }

  private resetMovement() {
    this.currentRow = this.currentColumn = null;
    this.prevRow = this.prevColumn = null;
  }
}
