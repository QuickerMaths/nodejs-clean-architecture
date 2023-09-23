/**
 * The function `makeGetRefreshToken` is a JavaScript function that takes in an object with a
 * `verifyRefreshToken` function and returns an async function `getRefreshToken` that retrieves the
 * refresh token from an HTTP request, verifies it using the `verifyRefreshToken` function, and returns
 * an access token.
 *
 * @returns The function `makeGetRefreshToken` is being returned.
 */

export default function makeGetRefreshToken({ verifyRefreshToken }) {
  return async function getRefreshToken(httpRequest) {
    const refreshToken = httpRequest.cookies.refreshToken;

    const { accessToken } = await verifyRefreshToken({ refreshToken });

    return {
      statusCode: 200,
      body: {
        accessToken
      }
    };
  };
}
