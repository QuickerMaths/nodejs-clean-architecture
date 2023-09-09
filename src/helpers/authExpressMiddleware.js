import axios from "axios";
import authService from "../services/auth/index.auth-service.js";
import { ForbiddenError } from "../utils/errors/index.errors.js";

const authExpressMiddleware = (authService) => async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken || !refreshToken) {
    throw new ForbiddenError("Forbidden", 403, "Credentials missing.", true);
  }

  const decoded = authService.jwt.verifyToken(accessToken);

  if (!decoded) {
    throw new ForbiddenError("Forbidden", 403, "Token Invalid.", true);
  }

  if (decoded === "expired") {
    res.clearCookie("accessToken");

    try {
      await axios.get("http://localhost:3000/refresh-token", {
        withCredentials: true,
        headers: {
          Cookie: [
            `refreshToken=${refreshToken}`,
            `accessToken=${accessToken}`,
          ],
        },
      });

      // res.redirect(req.originalUrl);
    } catch (err) {
      next(err);
    }
  }

  req.user = decoded;

  next();
};

export default authExpressMiddleware(authService);
