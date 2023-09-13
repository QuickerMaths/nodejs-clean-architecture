/**
 * The function `makeCreateRefreshToken` creates a new refresh token for a user and stores it in the
 * refresh token database.
 *
 * @returns The function `makeCreateRefreshToken` returns an asynchronous function that takes an object
 * with properties `id`, `username`, and `email` as arguments. This function generates a refresh token
 * using the `authService.jwt.generateRefreshToken` method and inserts the token and user ID into the
 * `refreshTokenDb` using the `refreshTokenDb.insert` method. Finally, it returns the created refresh
 * token
 */

export default function makeCreateRefreshToken({
  refreshTokenDb,
  authService,
}) {
  return async function createRefreshToken({ id, username, email }) {
    const token = await authService.jwt.generateRefreshToken({
      id,
      username,
      email,
    });

    const refreshToken = await refreshTokenDb.insert({ token, userId: id });

    return refreshToken;
  };
}
