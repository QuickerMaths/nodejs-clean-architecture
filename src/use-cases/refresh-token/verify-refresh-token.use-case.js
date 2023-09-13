import { ForbiddenError } from "../../utils/errors/ForbiddenError.js";

/**
 * The function handles a forbidden error by removing a token from the database and throwing a
 * ForbiddenError with a custom message.
 *
 * @param message - The `message` parameter is a string that represents the error message to be
 * displayed when the ForbiddenError is thrown.
 *
 * @param [removeToken=false] - A boolean value indicating whether the token should be removed from the
 * database or not. If set to true, the token associated with the decoded token ID will be removed from
 * the database. If set to false, the token will not be removed.
 */

async function handleForbiddenError(message, removeToken = false) {
  if (removeToken)
    await refreshTokenDb.removeByProperty({ userId: decodedToken.id });

  throw new ForbiddenError("Forbidden.", 403, message, true);
}

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
  authService,
}) {
  return async function verifyRefreshToken({ requestToken }) {
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
