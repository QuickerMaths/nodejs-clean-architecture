import jwt from "jsonwebtoken";
import config from "../../config/config.js";
import { BaseError } from "../../utils/errors/index.errors.js";

export default function jwtService() {
  const verifyToken = (token) =>
    jwt.verify(token, config.jwt.jwtSecret, (err, decoded) => {
      if (err && err.name === "TokenExpiredError") console.log(err);
      return decoded;
    });

  const verifyRefreshToken = (token) => {
    return jwt.verify(token, config.jwt.jwtRefreshSecret, (err, decoded) => {
      //TODO: create custom error
      if (err === "TokenExpiredError")
        throw new BaseError("TokenExpiredError", 403, "token expired", true);

      return jwt.sign({ ...decoded }, config.jwt.jwtRefreshSecret, {
        expiresIn: config.jwt.jwtRefreshExpiration,
      });
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
