import makePostUser from "./post-user.controller.js";
import usersUseCase from "../../use-cases/users/index.use-case.js";

const postUser = makePostUser(usersUseCase.createUser);

const usersController = Object.freeze({
  postUser,
});

export default usersController;
export { postUser };
