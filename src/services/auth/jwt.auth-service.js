import jwt from "jsonwebtoken";
import config from "../../config/config.js";

export default function jwtService() {
  const verifyToken = (token) => jwt.verify(token, config.jwt.jwtSecret);

  const generateToken = (payload) =>
    jwt.sign(payload, config.jwt.jwtSecret, {
      expiresIn: 360000,
    });

  return Object.freeze({
    verifyToken,
    generateToken,
  });
}
