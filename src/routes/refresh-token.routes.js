import express from "express";
import refreshTokenController from "../controllers/refresh-token/index.controller.js";
import expressCallback from "../helpers/expressCallback.js";

const router = express.Router();

router.get("/", expressCallback(refreshTokenController.postRefreshToken));

export default router;
