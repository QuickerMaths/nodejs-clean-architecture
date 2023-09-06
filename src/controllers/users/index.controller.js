import makeLoginUser from "../../use-cases/users/login-user.use-case.js";
import makePostUser from "./post-user.controller.js";
import usersUseCase from "../../use-cases/users/index.use-case.js";

const loginUser = makeLoginUser(usersUseCase.loginUser);
const postUser = makePostUser(usersUseCase.createUser);

const usersController = Object.freeze({
  loginUser,
  postUser,
});

export default usersController;
export { postUser, loginUser };
