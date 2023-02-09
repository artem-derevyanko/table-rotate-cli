import { Transform } from 'node:stream';

import { InvalidTable, SquareTable } from '../tables';
import { validateInput } from '../../common/validators/input.validator';

export const createTableConvertorStream = () =>
  new Transform({
    objectMode: true,
    transform(chunk, _, callback) {
      const [inputError, { id, list }] = validateInput(chunk);
      if (inputError && id) {
        return callback(null, new InvalidTable(inputError, id));
      }

      if (!inputError && id) {
        return callback(null, SquareTable.fromFlatList(list, id));
      }

      return callback(inputError);
    },
  });
