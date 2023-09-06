import { BaseError } from "./BaseError.js";

export class DuplicateError extends BaseError {
  constructor(
    name = "Duplicate Error",
    statusCode = 409,
    message = "Conflict",
    isOperational = true
  ) {
    super(name, statusCode, message, isOperational);
  }
}
