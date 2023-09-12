import { UnauthorizedError } from "../../utils/errors/index.errors.js";

export default function makeLoginUser({
  usersDb,
  authService,
  refreshTokenUseCase,
}) {
  return async function loginUser({ email, password } = {}) {
    const user = await usersDb.getByEmail({ email });

    if (!user) {
      throw new UnauthorizedError("Unauthorized", 401, "Invalid email.", true);
    }

    const isValid = await authService.hash.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedError(
        "Unauthorized",
        401,
        "Invalid password.",
        true
      );
    }

    const accessToken = await authService.jwt.generateToken({
      id: user._id,
      username: user.username,
      email: user.email,
    });
    const { token: refreshToken } =
      await refreshTokenUseCase.createRefreshToken({
        id: user._id,
        username: user.username,
        email: user.email,
      });

    return {
      accessToken,
      refreshToken,
    };
  };
}
