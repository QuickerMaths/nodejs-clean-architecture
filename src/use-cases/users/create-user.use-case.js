export default function makeCreateUser(usersDb, validate, authService) {
  return async function createUser({ username, email, password } = {}) {
    const user = {
      username,
      email,
      password,
    };

    validate(user);

    const hashedPassword = await authService.encrypt(password);

    await usersDb.insert({
      username,
      email,
      password: hashedPassword,
    });

    return user;
  };
}
