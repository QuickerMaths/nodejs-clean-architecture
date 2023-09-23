import { ForbiddenError } from "../../utils/errors/ForbiddenError.js";

export default function makeVerifyRefreshToken({
  refreshTokenDb,
  authService
}) {
  return async function verifyRefreshToken({ requestToken }) {
    const decodedToken = authService.jwt.decodeToken(requestToken);

    if (!decodedToken) {
      throw new ForbiddenError("Invalid refresh token.");
    }

    const isTokenInDb = await refreshTokenDb.findByProperty({
      userId: decodedToken.id
    });

    if (!isTokenInDb) {
      throw new ForbiddenError("Invalid refresh token.");
    } else if (isTokenInDb.token !== requestToken) {
      await refreshTokenDb.remove({ userId: decodedToken.id });
      throw new ForbiddenError("Invalid refresh token.");
    }

    const verificationResult = await authService.jwt.verifyRefreshToken(
      requestToken
    );

    if (!verificationResult) {
      await refreshTokenDb.remove({ userId: decodedToken.id });
      throw new ForbiddenError(
        "Forbidden.",

        "Invalid refresh token."
      );
    } else if (verificationResult === "expired") {
      await refreshTokenDb.remove({ userId: decodedToken.id });
      throw new ForbiddenError("Invalid refresh token.");
    }

    return {
      accessToken: verificationResult
    };
  };
}
