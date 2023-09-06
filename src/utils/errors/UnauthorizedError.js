import { BaseError } from "./BaseError.js";

export class UnauthorizedError extends BaseError {
  constructor(
    name = "Unauthorized",
    statusCode = 401,
    description = "Invalid credentials",
    isOperational = true
  ) {
    super(name, statusCode, description, isOperational);
  }
}
