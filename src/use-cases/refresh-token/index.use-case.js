import makeCreateRefreshToken from "./creat-refresh-token.use-case.js";
import makeDeleteRefreshToke from "./delete-refresh-token.use-case.js";
import refreshTokenDb from "../../data-access/refresh-token/index.db.js";
import authService from "../../services/auth/index.auth-service.js";

const createRefreshToken = makeCreateRefreshToken(refreshTokenDb, authService);
const deleteRefreshToken = makeDeleteRefreshToke(refreshTokenDb);

const refreshTokenUseCase = Object.freeze({
  createRefreshToken,
  deleteRefreshToken,
});

export default refreshTokenUseCase;
export { createRefreshToken, deleteRefreshToken };
