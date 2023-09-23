import { BaseError } from "./BaseError.js";

export class NotFoundError extends BaseError {
  constructor(description = "Not found") {
    super("Not found", 404, description, true);
  }
}
