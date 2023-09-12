export default function makeCreateRefreshToken(refreshTokenDb, authService) {
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
