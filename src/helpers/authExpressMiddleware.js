import authService from "../services/auth/index.auth-service.js";
import { ForbiddenError } from "../utils/errors/index.errors.js";

const authExpressMiddleware = (authService) => (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader?.startsWith("Bearer ")) {
    throw new ForbiddenError("Forbidden", 403, "Credentials missing.", true);
  }

  const token = authHeader.split(" ")[1];

  const decoded = authService.jwt.verifyToken(token);

  if (!decoded) {
    throw new ForbiddenError("Forbidden", 403, "Token Invalid.", true);
  }

  if (decoded === "expired") {
    // here should be a axios request to refresh token
  }

  req.user = decoded;
  req.skipRefresh = true;

  next();
};

export default authExpressMiddleware(authService);
