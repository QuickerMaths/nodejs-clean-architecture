import { ForbiddenError } from "../../utils/errors/ForbiddenError.js";

export default function makeVerifyRefreshToken(refreshTokenDb, authService) {
  return async function verifyRefreshToken(requestToken) {
    const isTokenInDb = await refreshTokenDb.findByProperty({
      token: requestToken,
    });

    if (!isTokenInDb === requestToken) {
      throw new ForbiddenError("Forbidden.", 403, "Invalid refresh token.");
    }

    // if verification is successful this returns new access token
    const decoded = await authService.jwt.verifyRefreshToken(requestToken);

    if (!decoded) {
      throw new ForbiddenError(
        "Forbidden.",
        403,
        "Invalid refresh token.",
        true
      );
    } else if (decoded === "expired") {
      await refreshTokenDb.remove(requestToken);
      throw new ForbiddenError(
        "Forbidden.",
        403,
        "Refresh token expired please login again.",
        true
      );
    }

    console.log("bas");
    return {
      accessToken: decoded,
      refreshToken: requestToken,
    };
  };
}
