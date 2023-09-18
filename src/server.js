import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import usersRouter from "./routes/users.routes.js";
import notesRouter from "./routes/notes.routes.js";
import refreshTokenRouter from "./routes/refresh-token.routes.js";
import notFound from "./routes/not-found.routes.js";
import pino from "pino-http";
import loggerOptions from "./helpers/logger.js";

function createServer() {
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

  app.use("/auth", usersRouter);
  app.use("/notes", notesRouter);
  app.use("/refresh-token", refreshTokenRouter);
  // app.use("*", notFound);

  return app;
}

export default createServer;
