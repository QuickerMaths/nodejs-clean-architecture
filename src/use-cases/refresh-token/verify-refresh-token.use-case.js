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
      throw new ForbiddenError(
        "Forbidden.",
        403,
        "Invalid refresh token.",
        true
      );
    }

    const isTokenInDb = await refreshTokenDb.findByProperty({
      userId: decodedToken.id
    });

    if (!isTokenInDb) {
      throw new ForbiddenError(
        "Forbidden.",
        403,
        "Invalid refresh token.",
        true
      );
    } else if (isTokenInDb.token !== requestToken) {
      await refreshTokenDb.remove({ userId: decodedToken.id });
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

    if (!verificationResult) {
      await refreshTokenDb.remove({ userId: decodedToken.id });
      throw new ForbiddenError(
        "Forbidden.",
        403,
        "Invalid refresh token.",
        true
      );
    } else if (verificationResult === "expired") {
      await refreshTokenDb.remove({ userId: decodedToken.id });
      throw new ForbiddenError(
        "Forbidden.",
        403,
        "Invalid refresh token.",
        true
      );
    }

    return {
      accessToken: verificationResult
    };
  };
}
