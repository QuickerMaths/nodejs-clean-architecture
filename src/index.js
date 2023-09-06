import "dotenv/config";
import express from "express";
import db from "../db/index.js";
import usersRouter from "./routes/users.routes.js";
import notesRouter from "./routes/notes.routes.js";
import notFound from "./routes/not-found.routes.js";
import errorHandler from "./helpers/errorHandler.js";
import pino from "pino-http";
import loggerOptions, { logger } from "./helpers/logger.js";

//TODO: Implement delete, update and get by id routes
//TODO: Add users and authentication
//TODO: Implement initial database set up
//TODO: Add tests

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(pino(loggerOptions));

app.use("/auth", usersRouter);
app.use("/notes", notesRouter);
app.use(notFound);

app.use((err, req, res, next) => {
  if (!errorHandler.isTrustedError(err)) {
    next(err);
  }

  errorHandler.handleError(err);
});

process.on("uncaughtException", (error) => {
  errorHandler.handleError(error);

  if (!errorHandler.isTrustedError(error)) {
    logger.error(error);
    logger.fatal("Server is shutting down");
    process.exit(1);
  }
});

db.once("open", () => {
  app.listen(process.env.PORT, () => {
    logger.info(`Server is listening on port ${process.env.PORT}`);
    logger.info(`Database is connected to db`);
  });
});
