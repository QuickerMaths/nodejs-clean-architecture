import jwtService from "./jwt.auth-service.js";
import hashService from "./hash.auth-service.js";
import refreshTokenService from "./refresh-token.auth-service.js";

const jwt = jwtService();
const hash = hashService();
const refreshToken = refreshTokenService();

const authService = Object.freeze({
  jwt,
  hash,
  refreshToken,
});

export default authService;
export { jwt, hash };
