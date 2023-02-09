import fs from 'node:fs';

import { join } from 'node:path';
import { Readable, Writable } from 'node:stream';

import { ValidationError } from '../../common/errors/validation.error';

interface ProgramArguments {
  input: Readable;

  output: Writable;
}

export const getProgramArguments = (): Readonly<ProgramArguments> => {
  const [inputArg, outputArg] = process.argv.slice(2);
  if (!inputArg) {
    throw new ValidationError('The program requires at least 1 argument, but only 0 were passed');
  }

  const inputPath = join(process.cwd(), inputArg);
  if (!fs.existsSync(inputPath)) {
    throw new ValidationError("The passed input path hasn't found");
  }

  const outputPath = outputArg ? join(process.cwd(), outputArg) : null;
  return {
    input: fs.createReadStream(inputPath),
    output: outputPath ? fs.createWriteStream(outputPath) : process.stdout,
  } as const;
};
