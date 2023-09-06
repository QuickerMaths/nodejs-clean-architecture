import bcrypt from "bcrypt";

export default function hashService() {
  const encrypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

  const compare = (password, hashedPassword) =>
    bcrypt.compareSync(password, hashedPassword);

  return Object.freeze({
    encrypt,
    compare,
  });
}
