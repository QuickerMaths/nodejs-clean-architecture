import { BaseError } from "./BaseError.js";

export class MissingPropertyError extends BaseError {
  constructor(
    name = "Missing Property",
    statusCode = 400,
    message = "Bad Request",
    isOperational = true
  ) {
    super(name, statusCode, message, isOperational);
  }
}
