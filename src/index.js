import "dotenv/config";
import express from "express";
import morgan from "morgan";
import db from "../db/index.js";
import expressCallback from "./helpers/expressCallback.js";
import notesController from "./controllers/index.controller.js";
import errorHandler from "./helpers/errorHandler.js";

//TODO: Implement delete, update and get by id routes
//TODO: Add some route handling
//TODO: Work on better error handling
//TODO: Add users and authentication
//TODO: Implement initial database set up
//TODO: Add tests

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"));

app.get("/", expressCallback(notesController.getNotes));
app.post("/", expressCallback(notesController.postNote));

app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

app.use((err, req, res, next) => {
  if (!errorHandler.isTrustedError(err)) {
    next(err);
  }

  errorHandler.handleError(err);
});

process.on("uncaughtException", (error) => {
  errorHandler.handleError(error);
  if (!errorHandler.isTrustedError(error)) {
    process.exit(1);
  }
});

db.once("open", () => {
  app.listen(3000, () => {
    console.log(`Server is listening on port ${3000}`);
    console.log(`Database is connected to db`);
  });
});
