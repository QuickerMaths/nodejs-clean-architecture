import makeCreateRefreshToken from "./creat-refresh-token.use-case.js";
import refreshTokenDb from "../../data-access/refresh-token/index.db.js";
import authService from "../../services/auth/index.auth-service.js";

const createRefreshToken = makeCreateRefreshToken(refreshTokenDb, authService);

const refreshTokenUseCase = Object.freeze({
  createRefreshToken,
});

export default refreshTokenUseCase;
export { createRefreshToken };
