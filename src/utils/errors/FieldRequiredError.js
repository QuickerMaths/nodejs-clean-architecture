import { BaseError } from "./BaseError.js";

export class FieldRequiredError extends BaseError {
  constructor(
    name = "Field Required Error",
    statusCode = 400,
    message = "Bad Request",
    isOperational = true
  ) {
    super(name, statusCode, message, isOperational);
  }
}
