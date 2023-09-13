import config from "./config/config.js";
import express from "express";
import cors from "cors";
import pino from "pino-http";
import cookieParser from "cookie-parser";
import db from "../db/index.js";
import loggerOptions, { logger } from "./helpers/logger.js";
import usersRouter from "./routes/users.routes.js";
import notesRouter from "./routes/notes.routes.js";
import refreshTokenRouter from "./routes/refresh-token.routes.js";
import notFound from "./routes/not-found.routes.js";
import errorHandler from "./helpers/errorHandler.js";
import swaggerDocs from "./utils/docs/swagger.js";

//TODO: figure out how to use notFound route so that it doesn't interfere with swagger docs
//TODO: Implement initial database set up
//TODO: Add tests

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());
app.use(pino(loggerOptions));

// Routes

app.use("/auth", usersRouter);
app.use("/notes", notesRouter);
app.use("/refresh-token", refreshTokenRouter);
// app.use("*", notFound);

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

db.once("open", () => {
  app.listen(config.port, () => {
    logger.info(`Server is listening on port ${config.port}`);
    logger.info(`Database is connected to db`);

    swaggerDocs(app);
  });
});
