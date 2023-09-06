import authService from "../services/auth/index.auth-service.js";
import { ForbiddenError } from "../utils/errors/index.errors.js";

function makeAuthExpressMiddleware(authService) {
  return function authExpressMiddleware(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader) {
      next(
        new ForbiddenError(
          "Forbidden",
          403,
          "Authorization header missing.",
          true
        )
      );
    }

    if (!authHeader?.startsWith("Bearer ")) {
      next(
        new ForbiddenError(
          "Forbidden",
          403,
          "Authorization header missing.",
          true
        )
      );
    }
    const token = authHeader.split(" ")[1];

    const decoded = authService.jwt.verifyToken(token);

    if (!decoded) {
      next(
        new ForbiddenError(
          "Forbidden",
          403,
          "Authorization header missing.",
          true
        )
      );
    }

    req.user = decoded;

    next();
  };
}

const authExpressMiddleware = makeAuthExpressMiddleware(authService);

export default authExpressMiddleware;
