import "dotenv/config";
import express from "express";
import morgan from "morgan";
import db from "../db/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

db.once("open", () => {
  app.listen(3000, () => {
    console.log(`Server is listening on port ${3000}`);
    console.log(`Database is connected to db`);
  });
});
