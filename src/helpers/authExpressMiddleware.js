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
    axios
      .post("http://localhost:3000/refresh-token", {
        refreshToken: req.cookies.refreshToken,
      })
      .then((res) => {
        console.log(res);
      })
      .catch(next);
  }

  req.user = decoded;

  next();
};

export default authExpressMiddleware(authService);
