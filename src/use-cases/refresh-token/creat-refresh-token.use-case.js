export default function makeCreateRefreshToken(refreshTokenDb, authService) {
  return async function createRefreshToken({ id }) {
    const token = await authService.jwt.generateRefreshToken({ userId: id });

    const refreshToken = await refreshTokenDb.insert({ token, user: id });

    return refreshToken;
  };
}
