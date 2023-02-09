export class ValidationError extends Error {
  constructor(message = 'Something went wrong') {
    super(message);

    Error.captureStackTrace(this, this.constructor);
  }
}
