import { ForbiddenError } from "../../utils/errors/ForbiddenError.js";

async function handleForbiddenError(message, removeToken = false) {
  if (removeToken)
    await refreshTokenDb.removeByProperty({ userId: decodedToken.id });

  throw new ForbiddenError("Forbidden.", 403, message, true);
}

export default function makeVerifyRefreshToken(refreshTokenDb, authService) {
  return async function verifyRefreshToken(requestToken) {
    const decodedToken = authService.jwt.decodeToken(requestToken);

    if (!decodedToken) {
      await handleForbiddenError("Invalid refresh token.");
    }

    const isTokenInDb = await refreshTokenDb.findByProperty({
      userId: decodedToken.id,
    });

    if (!isTokenInDb) {
      await handleForbiddenError("Invalid refresh token.");
    } else if (isTokenInDb.token !== requestToken) {
      await handleForbiddenError("Invalid refresh token.", true);
    }

    const verificationResult = await authService.jwt.verifyRefreshToken(
      requestToken
    );

    if (!verificationResult) {
      await handleForbiddenError("Invalid refresh token.", true);
    } else if (verificationResult === "expired") {
      await handleForbiddenError(
        "Refresh token expired please login again.",
        true
      );
    }

    return {
      accessToken: verificationResult,
    };
  };
}
