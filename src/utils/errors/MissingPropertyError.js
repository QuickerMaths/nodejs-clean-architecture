import { BaseError } from "./BaseError.js";

export class MissingPropertyError extends BaseError {
  constructor(message = "Bad Request") {
    super("Missing Property", 400, message, true);
  }
}
