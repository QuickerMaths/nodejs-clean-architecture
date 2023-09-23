import { ForbiddenError } from "../../utils/errors/ForbiddenError.js";

/**
 * The function `makeVerifyRefreshToken` verifies the validity of a refresh token and returns an access
 * token if the refresh token is valid.
 *
 * @returns The function `makeVerifyRefreshToken` returns an asynchronous function that takes an object
 * parameter `{ requestToken }`. Inside the function, it performs various checks and verifications on
 * the `requestToken` and returns an object with an `accessToken` property.
 */

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
