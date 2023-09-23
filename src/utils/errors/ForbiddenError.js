import { BaseError } from "./BaseError.js";

export class ForbiddenError extends BaseError {
  constructor(description = "Access denied.") {
    super("Forbidden", 403, description, true);
  }
}
