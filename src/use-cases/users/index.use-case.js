import authService from "../../services/auth/index.auth-service.js";
import validations from "../../services/validations/index.validation.js";
import usersDb from "../../data-access/users/index.db.js";
import makeLoginUser from "./login-user.use-case.js";
import makeCreateUser from "./create-user.use-case.js";
import makeLogoutUser from "./logout-user.use-case.js";
import refreshTokenUseCase from "../refresh-token/index.use-case.js";
import refreshTokenDb from "../../data-access/refresh-token/index.db.js";

/* The code is creating instances of different use cases for managing users. */

const loginUser = makeLoginUser({ usersDb, authService, refreshTokenUseCase });
const logoutUser = makeLogoutUser({ usersDb, authService, refreshTokenDb });
const createUser = makeCreateUser({
  usersDb,
  validate: validations.userValidation,
  authService,
});

const usersUseCase = Object.freeze({
  loginUser,
  logoutUser,
  createUser,
});

export default usersUseCase;
