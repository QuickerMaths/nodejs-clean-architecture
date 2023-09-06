import authService from "../../services/auth/index.auth-service.js";
import validations from "../../services/validations/index.validation.js";
import usersDb from "../../data-access/users/index.db.js";
import makeLoginUser from "./login-user.use-case.js";
import makeCreateUser from "./create-user.use-case.js";

const loginUser = makeLoginUser(usersDb, authService);
const createUser = makeCreateUser(
  usersDb,
  validations.userValidation,
  authService
);

const usersUseCase = Object.freeze({
  loginUser,
  createUser,
});

export default usersUseCase;
export { createUser, loginUser };