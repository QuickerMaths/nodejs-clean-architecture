import express from "express";
import notesController from "../controllers/notes/index.controller.js";
import expressCallback from "../helpers/expressCallback.js";
import authService from "../services/auth/index.auth-service.js";

const router = express.Router();

router
  .get("/", expressCallback(notesController.getNotes))
  .post("/", expressCallback(notesController.postNote));

export default router;
