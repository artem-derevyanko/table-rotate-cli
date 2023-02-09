import { pipeline } from 'node:stream';

import {
  createCSVParserStream,
  createCSVFormatStream,
  createTableConvertorStream,
  createTableTransformerStream,
  createCSVUnparserStream,
} from './lib/streams';

import { toLogEntry } from './common/utils/logs.utils';
import { getProgramArguments } from './common/utils/cli.utils';

const main = () => {
  const { input, output } = getProgramArguments();

  pipeline(
    /**
     * Get data from input stream
     */
    input,
    /**
     * Parse input as CSV
     */
    createCSVParserStream(),
    /**
     * Validate, format and convert input to the table
     */
    createTableConvertorStream(),
    /**
     * Transform table
     */
    createTableTransformerStream((table) => table.rotateClockwise()),
    /**
     * Format output
     */
    createCSVFormatStream(),
    /**
     * Convert output to CSV
     */
    createCSVUnparserStream(),
    /**
     * Write CSV to the output stream
     */
    output,

    (err) => {
      if (err) {
        process.stderr.write(JSON.stringify(toLogEntry(err)));
      }
    },
  );
};

main();
