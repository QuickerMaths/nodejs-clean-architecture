import makePostRefreshToken from "./post-refresh-token.controller.js";
import refreshTokenUseCase from "../../use-cases/refresh-token/index.use-case.js";

const postRefreshToken = makePostRefreshToken(
  refreshTokenUseCase.verifyRefreshToken
);

const refreshTokenController = Object.freeze({
  postRefreshToken,
});

export default refreshTokenController;
export { postRefreshToken };

//TODO: rename file to get
