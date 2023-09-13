import jwt from "jsonwebtoken";
import config from "../../config/config.js";

export default function jwtService() {
  /**
   * The function `verifyToken` verifies a JWT token using a secret key and returns the decoded token
   * if it is valid, or "expired" if the token has expired.
   *
   * @param token - The `token` parameter is a string that represents a JSON Web Token (JWT).
   */

  const verifyToken = (token) =>
    jwt.verify(token, config.jwt.jwtSecret, (err, decoded) => {
      if (err && err.name === "TokenExpiredError") return "expired";
      if (err) return;
      return decoded;
    });

  /**
   * The function `verifyRefreshToken` verifies a refresh token using a secret key, checks if it is
   * expired, and returns a new token with updated expiration if valid.
   *
   * @param token - The `token` parameter is a refresh token that is used to verify the authenticity and
   * expiration of the token.
   *
   * @returns The function `verifyRefreshToken` returns either "expired" if the token is expired, or a
   * new JWT token if the token is valid.
   */

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

  /**
   * The function `decodeToken` decodes a JSON Web Token (JWT).
   *
   * @param token - The `token` parameter is a string that represents a JSON Web Token (JWT).
   */

  const decodeToken = (token) => jwt.decode(token);

  /**
   * The function `generateToken` generates a JSON Web Token (JWT) using the provided payload and
   * configuration.
   *
   * @param payload - The payload is an object that contains the data you want to include in the token.
   * This can be any information that you want to associate with the token, such as user details or
   * permissions.
   */

  const generateToken = (payload) =>
    jwt.sign(payload, config.jwt.jwtSecret, {
      expiresIn: config.jwt.jwtExpiration,
    });

  /**
   * The function generates a refresh token using a payload and a secret key.
   *
   * @param payload - The payload is an object that contains the data you want to include in the refresh
   * token. This can be any information that you want to associate with the token, such as the user's ID
   * or any other relevant data.
   *
   * @returns a JSON Web Token (JWT) that is generated using the provided payload, the refresh secret
   * from the config file, and the expiration time from the config file.
   */

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
