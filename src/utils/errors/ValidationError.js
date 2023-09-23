import { BaseError } from "./BaseError.js";

export class ValidationError extends BaseError {
  constructor(message = "Bad Request") {
    super("ValidationError", 400, message, true);
  }
}
