import jwt from "jsonwebtoken";

export default function jwtService() {
  const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);

  const generateToken = (payload) =>
    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });

  return Object.freeze({
    verifyToken,
    generateToken,
  });
}
