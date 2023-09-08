export default function makeLogoutUser(
  usersDb,
  authService,
  refreshTokenUseCase
) {
  return async function logoutUser(refreshToken) {
    const decoded = await authService.verifyRefreshToken(refreshToken);

    if (!decoded || decoded === "expired") {
      return {};
    }

    const user = await usersDb.getById(decoded.id);

    if (!user) {
      return {};
    }

    await refreshTokenUseCase.deleteRefreshToken(refreshToken);

    return {};
  };
}
