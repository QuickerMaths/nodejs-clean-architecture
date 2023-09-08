import axios from "axios";
import authService from "../services/auth/index.auth-service.js";
import { ForbiddenError } from "../utils/errors/index.errors.js";

const authExpressMiddleware = (authService) => (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken || !refreshToken) {
    throw new ForbiddenError("Forbidden", 403, "Credentials missing.", true);
  }

  const decoded = authService.jwt.verifyToken(accessToken);

  if (!decoded) {
    throw new ForbiddenError("Forbidden", 403, "Token Invalid.", true);
  }

  if (decoded === "expired") {
    axios
      .get("http://localhost:3000/refresh-token", {
        withCredentials: true,
        headers: {
          Cookie: [
            `accessToken=${accessToken}`,
            `refreshToken=${refreshToken}`,
          ],
        },
      })
      .catch(next);
  }

  req.user = decoded;

  next();
};

export default authExpressMiddleware(authService);
