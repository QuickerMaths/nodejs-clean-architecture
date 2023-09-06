import { BaseError } from "./BaseError.js";

export class ForbiddenError extends BaseError {
  constructor(
    name = "Forbidden",
    statusCode = 403,
    description = "Access denied.",
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational);
  }
}
