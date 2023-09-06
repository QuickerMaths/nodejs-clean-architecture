import makeLoginGetUser from "./login-get-user.controller.js";
import makePostUser from "./post-user.controller.js";
import usersUseCase from "../../use-cases/users/index.use-case.js";

const loginUser = makeLoginGetUser(usersUseCase.loginUser);
const postUser = makePostUser(usersUseCase.createUser);

const usersController = Object.freeze({
  loginUser,
  postUser,
});

export default usersController;
export { postUser, loginUser };
