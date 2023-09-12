import { UnauthorizedError } from "../../utils/errors/UnauthorizedError.js";

export default function makeLogoutUser(usersDb, authService, refreshTokenDb) {
  return async function logoutUser(refreshToken) {
    const { id } = await authService.jwt.decodeToken(refreshToken);

    const user = await usersDb.getById({ id });

    if (!user) {
      throw new UnauthorizedError(
        "Unauthorized",
        401,
        "User does not exist",
        true
      );
    }

    await refreshTokenDb.remove({ token: refreshToken });

    return {};
  };
}
