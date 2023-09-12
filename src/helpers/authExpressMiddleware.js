import authService from "../services/auth/index.auth-service.js";
import { BaseError, ForbiddenError } from "../utils/errors/index.errors.js";

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
    const result = await authService.refreshToken.getNewAccessToken(
      refreshToken
    );

    if (result?.name === "AxiosError") {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      next(new ForbiddenError("Forbidden", 403, "Token Invalid.", true));
    } else {
      res.cookie("accessToken", result, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
    }
  }

  req.user = decoded;

  next();
};

export default authExpressMiddleware(authService);
