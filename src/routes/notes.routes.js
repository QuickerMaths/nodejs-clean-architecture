import express from "express";
import notesController from "../controllers/notes/index.controller.js";
import expressCallback from "../helpers/expressCallback.js";
import authExpressMiddleware from "../helpers/authExpressMiddleware.js";

const router = express.Router();

router
  .get("/", authExpressMiddleware, expressCallback(notesController.getNotes))
  .post("/", authExpressMiddleware, expressCallback(notesController.postNote))
  .delete(
    "/:id",
    authExpressMiddleware,
    expressCallback(notesController.deleteNote)
  )
  .patch(
    "/:id",
    authExpressMiddleware,
    expressCallback(notesController.patchNote)
  );

export default router;
