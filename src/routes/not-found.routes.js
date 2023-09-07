import express from "express";

const router = express.Router();

router.get("*", (_, res) => {
  return res.status(404).json({
    statusCode: 404,
    body: {
      error: "You reached a route that is not defined on this server",
    },
  });
});

export default router;
