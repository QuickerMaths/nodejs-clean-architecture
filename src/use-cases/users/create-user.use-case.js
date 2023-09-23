import { DuplicateError } from "../../utils/errors/DuplicateError.js";

export default function makeCreateUser({ usersDb, validate, authService }) {
  return async function createUser({ username, email, password } = {}) {
    const user = {
      username,
      email,
      password
    };

    await validate(user);

    const existing = await usersDb.getByEmail({ email });

    if (existing) {
      throw new DuplicateError(`Email ${email} is currently used`);
    }

    const hashedPassword = await authService.hash.encrypt(password);

    const newUser = await usersDb.insert({
      username,
      email,
      password: hashedPassword
    });

    return {
      username: newUser.username,
      email: newUser.email,
      _id: newUser._id,
      updatedAt: newUser.updatedAt,
      createdAt: newUser.createdAt
    };
  };
}
