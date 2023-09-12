import { ForbiddenError } from "../../utils/errors/ForbiddenError.js";

export default function makeVerifyRefreshToken(refreshTokenDb, authService) {
  return async function verifyRefreshToken(requestToken) {
    const decodedToken = authService.jwt.decodeToken(requestToken);

    if (!decodedToken) {
      throw new ForbiddenError(
        "Forbidden.",
        403,
        "Invalid refresh token.",
        true
      );
    }

    const isTokenInDb = await refreshTokenDb.findByProperty({
      userId: decodedToken.id,
    });

    if (!isTokenInDb) {
      throw new ForbiddenError(
        "Forbidden.",
        403,
        "Invalid refresh token.",
        true
      );
    } else if (isTokenInDb.token !== requestToken) {
      await refreshTokenDb.remove({ token: isTokenInDb.token });
      throw new ForbiddenError(
        "Forbidden.",
        403,
        "Invalid refresh token.",
        true
      );
    }

    const verificationResult = await authService.jwt.verifyRefreshToken(
      requestToken
    );

    if (!verificationResult || verificationResult === "expired") {
      await refreshTokenDb.remove({ token: requestToken });

      if (verificationResult === "expired") {
        throw new ForbiddenError(
          "Forbidden.",
          403,
          "Refresh token expired. Please log in again.",
          true
        );
      }
      throw new ForbiddenError(
        "Forbidden.",
        403,
        "Invalid refresh token.",
        true
      );
    }

    return {
      accessToken: verificationResult,
    };
  };
}
