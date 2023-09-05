import { BaseError } from "./BaseError.js";

export class ValidationError extends BaseError {
  constructor(
    name = "ValidationError",
    httpCode = 400,
    message = "Bad Request",
    isOperational = true
  ) {
    super(name, httpCode, message, isOperational);
  }
}
