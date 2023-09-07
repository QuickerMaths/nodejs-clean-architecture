import { BaseError } from "../utils/errors/index.errors.js";
import { logger } from "./logger.js";

class ErrorHandler {
  async handleError(error) {
    //TODO: write errors to some internal file

    logger.error(error);
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
