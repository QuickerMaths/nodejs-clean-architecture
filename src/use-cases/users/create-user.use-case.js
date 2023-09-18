import { DuplicateError } from "../../utils/errors/DuplicateError.js";

/**
 * The `makeCreateUser` function is a factory function that returns an asynchronous function for
 * creating a new user, which validates the user data, checks for duplicate email, encrypts the
 * password, inserts the user into the database, and returns the created user's id, username, and
 * email.
 *
 * @returns The function `makeCreateUser` returns an asynchronous function `createUser`.
 */

export default function makeCreateUser({ usersDb, validate, authService }) {
  return async function createUser({ username, email, password } = {}) {
    const user = {
      username,
      email,
      password,
    };

    await validate(user);

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
      username: newUser.username,
      email: newUser.email,
      _id: newUser._id,
      updatedAt: newUser.updatedAt,
      createdAt: newUser.createdAt,
    };
  };
}
