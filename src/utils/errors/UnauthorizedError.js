import { BaseError } from "./BaseError.js";

export class UnauthorizedError extends BaseError {
  constructor(description = "Invalid credentials") {
    super("Unauthorized", 401, description, true);
  }
}
