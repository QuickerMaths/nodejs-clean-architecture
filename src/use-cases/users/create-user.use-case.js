import { DuplicateError } from "../../utils/errors/DuplicateError.js";

export default function makeCreateUser({ usersDb, validate, authService }) {
  return async function createUser({ username, email, password } = {}) {
    const user = {
      username,
      email,
      password,
    };

    validate(user);

    const existing = await usersDb.getByEmail({ email });

    if (existing) {
      throw new DuplicateError(
        "Duplicate Email Error",
        409,
        `Email ${email} is currently used`,
        true
      );
    }

    const hashedPassword = await authService.hash.encrypt(password);

    const newUser = await usersDb.insert({
      username,
      email,
      password: hashedPassword,
    });

    return {
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
    };
  };
}
