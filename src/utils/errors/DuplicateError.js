import { BaseError } from "./BaseError.js";

export class DuplicateError extends BaseError {
  constructor(message = "Conflict") {
    super("Duplicate Error", 409, message, true);
  }
}
