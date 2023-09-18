import config from "./config/config.js";
import db from "../db/index.js";
import createServer from "./server.js";
import errorHandler from "./helpers/errorHandler.js";
import swaggerDocs from "./utils/docs/swagger.js";
import { logger } from "./helpers/logger.js";

//TODO: figure out how to use notFound route so that it doesn't interfere with swagger docs
//TODO: Implement initial database set up
//TODO: Add tests

const app = createServer();

// Error handling middleware

app.use((err, req, res, next) => {
  errorHandler.handleError(err);

  if (!errorHandler.isTrustedError(err)) {
    logger.fatal("Server is shutting down");
    process.exit(1);
  }

  return res.status(err.statusCode).send({
    statusCode: err.statusCode,
    body: {
      error: err.message,
    },
  });
});

// Uncaught exception handling

process.on("uncaughtException", (error) => {
  errorHandler.handleError(error);

  if (!errorHandler.isTrustedError(error)) {
    logger.fatal("Server is shutting down");
    process.exit(1);
  }
});

// Database connection

// this is to prevents listen EADDRINUSE: address already in use :::port error when running tests

db.once("open", () => {
  app.listen(config.port, () => {
    logger.info(`Server is listening on port ${config.port}`);
    logger.info(`Database is connected to db`);

    swaggerDocs(app);
  });
});
