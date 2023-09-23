import authService from "../services/auth/index.auth-service.js";
import { ForbiddenError } from "../utils/errors/index.errors.js";
/**
 * The `authExpressMiddleware` function is a middleware that checks for the presence and validity of
 * access and refresh tokens in the request cookies, and handles token refresh if the access token is
 * expired.
 *
 * @param authService - The `authService` parameter is an object that provides authentication-related
 * services, such as verifying and refreshing tokens. It is used within the middleware function to
 * perform authentication checks and operations.
 */

const authExpressMiddleware = (authService) => async (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken || !refreshToken) {
    next(new ForbiddenError("Credentials missing"));
  }

  const decoded = authService.jwt.verifyToken(accessToken);

  if (!decoded) {
    next(new ForbiddenError("Token Invalid."));
  }

  if (decoded === "expired") {
    await authService.refreshToken
      .getNewAccessToken(refreshToken)
      .then((newAccessToken) => {
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true
        });
      })
      .catch((e) => {
        console.log(e);
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        next(new ForbiddenError(e.message));
      });
  }

  req.user = decoded;

  next();
};

export default authExpressMiddleware(authService);
