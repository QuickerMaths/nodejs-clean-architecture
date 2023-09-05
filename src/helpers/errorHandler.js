import { BaseError } from "../utils/errors/index.errors.js";

class ErrorHandler {
  async handleError(err) {
    console.log(err);
  }

  isTrustedError(error) {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
    return false;
  }
}

const errorHandler = new ErrorHandler();

export default errorHandler;
