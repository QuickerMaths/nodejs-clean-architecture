import jwt from "jsonwebtoken";
import config from "../../config/config.js";

export default function jwtService() {
  const verifyToken = (token) =>
    jwt.verify(token, config.jwt.jwtSecret, (err, decoded) => {
      if (err && err.name === "TokenExpiredError") return "expired";
      if (err) return;
      return decoded;
    });

  const verifyRefreshToken = (token) => {
    return jwt.verify(token, config.jwt.jwtRefreshSecret, (err, decoded) => {
      if (err && err.name === "TokenExpiredError") return "expired";
      if (err) return;

      const toSign = {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
      };

      return jwt.sign(toSign, config.jwt.jwtSecret, {
        expiresIn: config.jwt.jwtExpiration,
      });
    });
  };

  const decodeToken = (token) => jwt.decode(token);

  const generateToken = (payload) =>
    jwt.sign(payload, config.jwt.jwtSecret, {
      expiresIn: config.jwt.jwtExpiration,
    });

  const generateRefreshToken = (payload) => {
    return jwt.sign(payload, config.jwt.jwtRefreshSecret, {
      expiresIn: config.jwt.jwtRefreshExpiration,
    });
  };

  return Object.freeze({
    verifyToken,
    verifyRefreshToken,
    decodeToken,
    generateToken,
    generateRefreshToken,
  });
}
