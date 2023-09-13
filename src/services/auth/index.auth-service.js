import jwtService from "./jwt.auth-service.js";
import hashService from "./hash.auth-service.js";
import refreshTokenService from "./refresh-token.auth-service.js";
import refreshTokenDb from "../../data-access/refresh-token/index.db.js";

/* The code is creating an `authService` object that contains three services: `jwt`, `hash`, and `refreshToken`. */
const jwt = jwtService(refreshTokenDb);
const hash = hashService();
const refreshToken = refreshTokenService();

const authService = Object.freeze({
  jwt,
  hash,
  refreshToken,
});

export default authService;
