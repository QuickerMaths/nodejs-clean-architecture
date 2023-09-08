import authService from "../../services/auth/index.auth-service.js";
import validations from "../../services/validations/index.validation.js";
import usersDb from "../../data-access/users/index.db.js";
import makeLoginUser from "./login-user.use-case.js";
import makeCreateUser from "./create-user.use-case.js";
import makeLogoutUser from "./logout-user.use-case.js";
import refreshTokenUseCase from "../refresh-token/index.use-case.js";

const loginUser = makeLoginUser(usersDb, refreshTokenUseCase, authService);
const logoutUser = makeLogoutUser(usersDb, refreshTokenUseCase, authService);
const createUser = makeCreateUser(
  usersDb,
  validations.userValidation,
  authService
);

const usersUseCase = Object.freeze({
  loginUser,
  logoutUser,
  createUser,
});

export default usersUseCase;
export { loginUser, logoutUser, createUser };
