import bcrypt from "bcrypt";

export default function hashService() {
  /**
   * The `encrypt` function uses bcrypt to generate a salt and hash the given password.
   *
   * @param password - The `password` parameter is the plain text password that you want to encrypt.
   *
   * @returns The encrypted hash of the password.
   */

  const encrypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

  /**
   * The function "compare" compares a plain text password with a hashed password using bcrypt.
   *
   * @param password - The password parameter is the plain text password that you want to compare with
   * the hashed password.
   *
   * @param hashedPassword - The hashed password is the result of applying a one-way cryptographic hash
   * function to the original password. It is a string that represents the password in a non-reversible
   * format.
   */

  const compare = (password, hashedPassword) =>
    bcrypt.compareSync(password, hashedPassword);

  return Object.freeze({
    encrypt,
    compare,
  });
}
