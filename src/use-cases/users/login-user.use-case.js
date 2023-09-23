import { UnauthorizedError } from "../../utils/errors/index.errors.js";

/**
 * The `makeLoginUser` function is a factory function that returns a function for logging in a user,
 * which checks the user's email and password, generates an access token and refresh token, and returns
 * them.
 *
 * @returns The function `makeLoginUser` returns an asynchronous function `loginUser` that takes an
 * object with `email` and `password` properties as its parameter.
 */

export default function makeLoginUser({
  usersDb,
  authService,
  refreshTokenUseCase
}) {
  return async function loginUser({ email, password } = {}) {
    const user = await usersDb.getByEmail({ email });

    if (!user) {
      throw new UnauthorizedError("Invalid email.");
    }

    const isValid = await authService.hash.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedError("Invalid password.");
    }

    const accessToken = await authService.jwt.generateToken({
      id: user._id,
      username: user.username,
      email: user.email
    });
    const { token: refreshToken } =
      await refreshTokenUseCase.createRefreshToken({
        id: user._id,
        username: user.username,
        email: user.email
      });

    return {
      user: {
        username: user.username,
        email: user.email,
        _id: user._id,
        updatedAt: user.updatedAt,
        createdAt: user.createdAt
      },
      tokenPair: {
        accessToken,
        refreshToken
      }
    };
  };
}
