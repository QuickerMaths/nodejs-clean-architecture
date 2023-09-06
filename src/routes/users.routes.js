import express from "express";
import usersController from "../controllers/users/index.controller.js";

const router = express.Router();

router.post("/", usersController.postUser);

export default router;
