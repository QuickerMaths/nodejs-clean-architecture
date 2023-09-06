import authService from "../../services/auth/index.auth-service.js";
import validations from "../../services/validations/index.validation.js";
import usersDb from "../../data-access/users/index.db.js";
import makeCreateUser from "./create-user.use-case.js";

const createUser = makeCreateUser(
  usersDb,
  validations.userValidation,
  authService
);

const usersUseCase = Object.freeze({
  createUser,
});

export default usersUseCase;
export { createUser };
