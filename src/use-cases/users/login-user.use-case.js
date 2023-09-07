import { UnauthorizedError } from "../../utils/errors/index.errors.js";

export default function makeLoginUser(usersDb, authService) {
  return async function loginUser({ email, password } = {}) {
    const user = await usersDb.getByEmail({ email });

    if (!user) {
      throw new UnauthorizedError("Unauthorized", 403, "Invalid email.", true);
    }

    const isValid = await authService.hash.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedError(
        "Unauthorized",
        403,
        "Invalid password.",
        true
      );
    }

    // TODO: Send this in httpsOnly cookie
    const { accessToken, refreshToken } =
      await authService.jwt.generateTokePair({
        id: user._id,
        username: user.username,
        email: user.email,
      });

    await usersDb.update({
      id: user._id,
      refreshToken,
    });

    return {
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken,
      refreshToken,
    };
  };
}
