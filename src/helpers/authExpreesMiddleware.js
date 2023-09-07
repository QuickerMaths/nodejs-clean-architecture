import authService from "../services/auth/index.auth-service.js";
import { ForbiddenError } from "../utils/errors/index.errors.js";

const authExpressMiddleware = (authService) => (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader?.startsWith("Bearer ")) {
    throw new ForbiddenError("Forbidden", 403, "Credentials missing.", true);
  }

  const token = authHeader.split(" ")[1];

  const decoded = authService.jwt.verifyToken(token);

  console.log(decoded);

  if (!decoded) {
    throw new ForbiddenError("Forbidden", 403, "Token Invalid.", true);
  }

  req.user = decoded;

  next();
};

export default authExpressMiddleware(authService);
