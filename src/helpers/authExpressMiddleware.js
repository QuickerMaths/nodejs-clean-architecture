import authService from "../services/auth/index.auth-service.js";
import { ForbiddenError } from "../utils/errors/index.errors.js";

const authExpressMiddleware = (authService) => async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken || !refreshToken) {
    next(new ForbiddenError("Forbidden", 403, "Credentials missing.", true));
  }

  const decoded = authService.jwt.verifyToken(accessToken);

  if (!decoded) {
    next(new ForbiddenError("Forbidden", 403, "Token Invalid.", true));
  }

  if (decoded === "expired") {
    await authService.refreshToken
      .getNewAccessToken(refreshToken)
      .then((newAccessToken) => {
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
      })
      .catch((e) => {
        console.log(e);
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        next(new ForbiddenError("Forbidden", e.statusCode, e.message, true));
      });
  }

  req.user = decoded;

  next();
};

export default authExpressMiddleware(authService);
