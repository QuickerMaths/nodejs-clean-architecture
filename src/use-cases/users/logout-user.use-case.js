import { UnauthorizedError } from "../../utils/errors/UnauthorizedError.js";

/**
 * The `makeLogoutUser` function logs out a user by removing their refresh token from the database.
 *
 * @returns The function `makeLogoutUser` returns an asynchronous function `logoutUser`.
 */
export default function makeLogoutUser({
  usersDb,
  authService,
  refreshTokenDb
}) {
  return async function logoutUser({ refreshToken }) {
    const { id } = await authService.jwt.decodeToken(refreshToken);

    const user = await usersDb.getById({ id });

    if (!user) {
      throw new UnauthorizedError("User does not exist");
    }

    await refreshTokenDb.remove({ token: refreshToken });

    return {};
  };
}
