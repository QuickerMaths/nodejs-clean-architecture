import { UnauthorizedError } from "../../utils/errors/index.errors.js";

export default function makeLoginUser(usersDb, authService) {
  return async function loginUser({ email, password } = {}) {
    const user = await usersDb.getByEmail({ email });

    if (!user) {
      throw new UnauthorizedError("Unauthorized", 403, "Invalid email.", true);
    }

    const isValid = await authService.compare(password, user.password);

    if (!isValid) {
      throw new UnauthorizedError(
        "Unauthorized",
        403,
        "Invalid password.",
        true
      );
    }

    return {
      username: user.username,
      email: user.email,
    };
  };
}
