import jwt from "jsonwebtoken";
import config from "../../config/config.js";

export default function jwtService() {
  const verifyToken = (token) => jwt.verify(token, config.jwt.jwtSecret);

  const verifyRefreshToken = (token) => {
    return jwt.verify(token, config.jwt.jwtRefreshSecret, (err, decoded) => {
      if (err) throw new Error("token invalid");
      return decoded;
    });
  };

  const generateToken = (payload) =>
    jwt.sign(payload, config.jwt.jwtSecret, {
      expiresIn: config.jwt.jwtExpiration,
    });

  const generateRefreshToken = (payload) => {
    return jwt.sign(payload, config.jwt.jwtRefreshSecret, {
      expiresIn: config.jwt.jwtRefreshExpiration,
    });
  };

  const generateTokePair = (payload) => {
    const accessToken = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
    };
  };

  return Object.freeze({
    verifyToken,
    verifyRefreshToken,
    generateToken,
    generateRefreshToken,
    generateTokePair,
  });
}
