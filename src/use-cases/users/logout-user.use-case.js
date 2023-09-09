import { UnauthorizedError } from "../../utils/errors/UnauthorizedError.js";

export default function makeLogoutUser(usersDb, authService, refreshTokenDb) {
  //TODO: fix this to actually remove refresh token from db
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

    await refreshTokenDb.remove(refreshToken);

    return {};
  };
}
