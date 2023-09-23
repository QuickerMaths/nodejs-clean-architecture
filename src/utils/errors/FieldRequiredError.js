import { BaseError } from "./BaseError.js";

export class FieldRequiredError extends BaseError {
  constructor(message = "Bad Request") {
    super("Field Required Error", 400, message, true);
  }
}
