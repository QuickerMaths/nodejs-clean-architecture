import express from "express";
import usersController from "../controllers/users/index.controller.js";
import expressCallback from "../helpers/expressCallback.js";

const router = express.Router();

router

  /**
   * @openapi
   * '/auth/logout':
   *  post:
   *   tags:
   *   - Users
   *   summary: Logs out the user that is currently logged in and removes refresh token associated with this user from the database.
   *   security:
   *    - cookieAuth: []
   *   responses:
   *    204:
   *     description: >
   *        Successfully logged out.
   *        The session ID has cleared the cookies named `accessToken` and `refreshToken` and removed the refresh token from the database.
   *     content:
   *       application/json:
   *         schema:
   *          $ref: '#/components/schemas/LogoutUserResponse'
   *    401:
   *     description: Unauthorized
   *     content:
   *       application/json:
   *         schema:
   *          $ref: '#/components/schemas/UnauthorizedError'
   */

  .get("/logout", expressCallback(usersController.logoutUser))

  /**
   * @openapi
   * '/auth/login':
   *  post:
   *   tags:
   *   - Users
   *   summary: Logs in user, returns the authentication cookies and saves refresh token in database.
   *   requestBody:
   *    required: true
   *    description: A JSON object containing the login and password
   *    content:
   *     application/json:
   *      schema:
   *       $ref: '#/components/schemas/LoginUser'
   *   responses:
   *    200:
   *     description: >
   *        Successfully authenticated.
   *        Returned a cookies named `accessToken` and `refreshToken`. You need to include this cookie in subsequent requests.
   *     headers:
   *      Set-Cookie:
   *       schema:
   *        type: array
   *        items: string
   *        example: ['accessToken=key123, Path=/, HttpOnly, Secure, sameSite="none"', 'refreshToken=key456, Path=/, HttpOnly, Secure, sameSite="none"']
   *     content:
   *      application/json:
   *       schema:
   *        $ref: '#/components/schemas/UserResponse'
   *    401:
   *     description: Unauthorized
   *     content:
   *       application/json:
   *         schema:
   *          $ref: '#/components/schemas/UnauthorizedError'
   */

  .post("/login", expressCallback(usersController.loginUser))

  /**
   * @openapi
   * '/auth/signup':
   *  post:
   *   tags:
   *   - Users
   *   summary: Create a new user
   *   requestBody:
   *    required: true
   *    content:
   *     application/json:
   *      schema:
   *       $ref: '#/components/schemas/CreateUser'
   *   responses:
   *    201:
   *     description: User created successfully
   *     content:
   *      application/json:
   *       schema:
   *        $ref: '#/components/schemas/CreateUserResponse'
   *    400:
   *      description: Bad Request
   *      content:
   *       application/json:
   *        schema:
   *         $ref: '#/components/schemas/BadRequestError'
   *    409:
   *     description: Conflict
   *     content:
   *       application/json:
   *         schema:
   *          $ref: '#/components/schemas/DuplicateError'
   */

  .post("/signup", expressCallback(usersController.postUser));

export default router;
