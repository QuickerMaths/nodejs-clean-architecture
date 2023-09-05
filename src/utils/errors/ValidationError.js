import { BaseError } from "./BaseError.js";

export class ValidationError extends BaseError {
  constructor(
    name = "ValidationError",
    statusCode = 400,
    message = "Bad Request",
    isOperational = true
  ) {
    super(name, statusCode, message, isOperational);
  }
}
