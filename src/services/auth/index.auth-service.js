import jwtService from "./jwt.auth-service.js";
import hashService from "./hash.auth-service.js";

const jwt = jwtService();
const hash = hashService();

const authService = Object.freeze({
  jwt,
  hash,
});

export default authService;
export { jwt, hash };
