export class BaseError extends Error {
  constructor(name, httpCode, message, isOperational) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}
