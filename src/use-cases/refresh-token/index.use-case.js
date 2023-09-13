import makeCreateRefreshToken from "./creat-refresh-token.use-case.js";
import makeVerifyRefreshToken from "./verify-refresh-token.use-case.js";
import refreshTokenDb from "../../data-access/refresh-token/index.db.js";
import authService from "../../services/auth/index.auth-service.js";

/* The code is creating instances of different use cases for managing refresh tokens. */

const createRefreshToken = makeCreateRefreshToken({
  refreshTokenDb,
  authService,
});
const verifyRefreshToken = makeVerifyRefreshToken({
  refreshTokenDb,
  authService,
});

const refreshTokenUseCase = Object.freeze({
  createRefreshToken,
  verifyRefreshToken,
});

export default refreshTokenUseCase;
