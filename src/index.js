import "dotenv/config";
import express from "express";
import morgan from "morgan";
import db from "../db/index.js";
import expressCallback from "./helpers/expressCallback.js";
import notesController from "./controllers/index.controller.js";

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

db.once("open", () => {
  app.listen(3000, () => {
    console.log(`Server is listening on port ${3000}`);
    console.log(`Database is connected to db`);
  });
});
