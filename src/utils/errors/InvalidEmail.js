import { BaseError } from "./BaseError.js";

export class InvalidEmail extends BaseError {
  constructor(message = "Bad Request") {
    super("Invalid Email Format", 400, message, true);
  }
}
