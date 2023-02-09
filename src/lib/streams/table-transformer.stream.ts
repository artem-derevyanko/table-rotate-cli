import { Transform } from 'node:stream';

import { InvalidTable, SquareTable } from '../tables';
import { ValidationError } from '../../common/errors/validation.error';

type TableTransformer = (table: SquareTable) => unknown;

export const createTableTransformerStream = (transformer: TableTransformer) => {
  return new Transform({
    objectMode: true,
    transform(chunk, _, callback) {
      if (chunk instanceof SquareTable) {
        return callback(null, transformer(chunk));
      }

      if (chunk instanceof InvalidTable) {
        return callback(null, chunk);
      }

      return callback(new ValidationError('Expected a table to perform transforming'));
    },
  });
};
