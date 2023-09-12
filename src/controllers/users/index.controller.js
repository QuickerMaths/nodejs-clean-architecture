import makeLoginGetUser from "./login-get-user.controller.js";
import makeLogoutGetUser from "./logout-get-user.controller.js";
import makePostUser from "./post-user.controller.js";
import usersUseCase from "../../use-cases/users/index.use-case.js";

const loginUser = makeLoginGetUser({ loginUser: usersUseCase.loginUser });
const logoutUser = makeLogoutGetUser({ logoutUser: usersUseCase.logoutUser });
const postUser = makePostUser({ addUser: usersUseCase.createUser });

const usersController = Object.freeze({
  loginUser,
  logoutUser,
  postUser,
});

export default usersController;
