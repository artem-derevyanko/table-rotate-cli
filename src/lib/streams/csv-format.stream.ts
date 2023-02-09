import { Transform } from 'node:stream';

import { BaseTable, InvalidTable } from '../tables';
import { ValidationError } from '../../common/errors/validation.error';

export const createCSVFormatStream = () => {
  return new Transform({
    objectMode: true,
    transform(table, _, callback) {
      if (!(table instanceof BaseTable)) {
        return callback(new ValidationError('Expected a table to perform formatting'));
      }

      return callback(null, {
        id: table.getId().toString(),
        json: `[${table.toFlatList().join(', ')}]`,
        is_valid: !(table instanceof InvalidTable),
      });
    },
  });
};
