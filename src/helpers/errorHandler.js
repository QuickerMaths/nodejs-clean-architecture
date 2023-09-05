import { BaseError } from "../utils/errors/index.errors.js";

class ErrorHandler {
  async handleError(error) {
    console.log(error);
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
