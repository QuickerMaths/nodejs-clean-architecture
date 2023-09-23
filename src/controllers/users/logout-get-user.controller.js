/**
 * The function `makeLogoutGetUser` is an async function that takes an HTTP request and a `logoutUser`
 * function as parameters, and returns a response object with a status code of 204 and a body
 * containing the content returned by the `logoutUser` function.
 *
 * @returns The function `makeLogoutGetUser` is returning an asynchronous function `logoutGetUser`.
 */

export default function makeLogoutGetUser({ logoutUser }) {
  return async function logoutGetUser(httpRequest) {
    const { refreshToken } = httpRequest.cookies;

    const content = await logoutUser({ refreshToken });

    return {
      statusCode: 204,
      body: content
    };
  };
}
