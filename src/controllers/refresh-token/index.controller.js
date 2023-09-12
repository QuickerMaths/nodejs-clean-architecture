import makeGetRefreshToken from "./get-refresh-token.controller.js";
import refreshTokenUseCase from "../../use-cases/refresh-token/index.use-case.js";

const getRefreshToken = makeGetRefreshToken({
  verifyRefreshToken: refreshTokenUseCase.verifyRefreshToken,
});

const refreshTokenController = Object.freeze({
  getRefreshToken,
});

export default refreshTokenController;
