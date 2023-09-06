import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export default function authService() {
  const encrypt = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };

  const compare = (password, hashedPassword) =>
    bcrypt.compareSync(password, hashedPassword);

  const verify = (token) => jwt.verify(token, process.env.JWT_SECRET);

  const generateToken = (payload) =>
    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });

  return Object.freeze({
    encrypt,
    compare,
    verify,
    generateToken,
  });
}
