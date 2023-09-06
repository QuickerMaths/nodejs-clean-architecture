import { BaseError } from "./BaseError";

export class InvalidEmail extends BaseError {
  constructor(
    name = "Invalid Email Format",
    statusCode = 400,
    message = "Bad Request",
    isOperational = true
  ) {
    super(name, statusCode, message, isOperational);
  }
}
