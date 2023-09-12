import { ForbiddenError } from "../../utils/errors/ForbiddenError.js";

export default function makeVerifyRefreshToken(refreshTokenDb, authService) {
  return async function verifyRefreshToken(requestToken) {
    const isTokenInDb = await refreshTokenDb.findByProperty({
      token: requestToken,
    });

    //TODO: this should also check if the token is related to the user making request and remove token from db if its invalid
    if (isTokenInDb.token !== requestToken) {
      throw new ForbiddenError(
        "Forbidden.",
        403,
        "Invalid refresh token.",
        true
      );
    }

    // if verification is successful this returns new access token
    const decoded = await authService.jwt.verifyRefreshToken(requestToken);

    if (!decoded) {
      await refreshTokenDb.remove({ token: requestToken });
      throw new ForbiddenError(
        "Forbidden.",
        403,
        "Invalid refresh token.",
        true
      );
    } else if (decoded === "expired") {
      await refreshTokenDb.remove({ token: requestToken });
      throw new ForbiddenError(
        "Forbidden.",
        403,
        "Refresh token expired please login again.",
        true
      );
    }

    return {
      decoded,
    };
  };
}
