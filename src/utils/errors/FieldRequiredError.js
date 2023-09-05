import { BaseError } from "./BaseError.js";

export class FieldRequiredError extends BaseError {
  constructor(
    name = "Field Required Error",
    httpCode = 400,
    message = "Bad Request",
    isOperational = true
  ) {
    super(name, httpCode, message, isOperational);
  }
}
