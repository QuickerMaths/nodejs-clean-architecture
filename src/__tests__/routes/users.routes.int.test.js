import validationMock from "../../__mocks__/services/validations/index.validation.mock.js";
import usersDbMock from "../../__mocks__/data-access/users/index.db.mock.js";
// import authServiceMock from "../../__mocks__/services/auth/index.auth-service.mock.js";

import request from "supertest";
import createServer from "../../server.js";
import userUtils from "../../utils/test-utlities/users.utils.js";
import { FieldRequiredError } from "../../utils/errors/index.errors.js";

const app = createServer();

describe("users router", () => {
  describe("POST /auth/signup", () => {
    it("Success --> return { statusCode 201, body: { user } }", async () => {
      //Arrange
      const { userSignUpInput, userSignUpPayload } = userUtils;
      validationMock.userValidation.mockImplementation(() =>
        Promise.resolve(true)
      );
      usersDbMock.getByEmail.mockImplementation(() => Promise.resolve(false));

      //Act
      const response = await request(app)
        .post("/auth/signup")
        .send(userSignUpInput);

      //Assert
      expect(response.statusCode).toBe(201);
      expect(response.body).toMatchObject(userSignUpPayload);
      expect(
        validationMock.userValidation &&
          usersDbMock.getByEmail &&
          usersDbMock.insert
      ).toHaveBeenCalledTimes(1);
    });

    it("Missing input field or validation rules violation --> return { statusCode 400, body: { error: message } }", async () => {
      //Arrange
      const { userSignUpWrongInput, errorResponse } = userUtils;
      validationMock.userValidation.mockImplementation(() => {
        throw new FieldRequiredError(
          "Field Required Error",
          400,
          "password field is required",
          true
        );
      });

      //Act
      const response = await request(app)
        .post("/auth/signup")
        .send(userSignUpWrongInput);

      //Assert
      expect(response.statusCode).toBe(400);
      expect(response.body).toMatchObject(errorResponse);
      expect(validationMock.userValidation).toHaveBeenCalledTimes(1);
      expect(validationMock.userValidation).toThrow(FieldRequiredError);
    });

    it("Email duplication --> return { statusCode 409, body: { error: message } }", async () => {
      //Arrange
      const { userSignUpInput, errorResponse } = userUtils;
      validationMock.userValidation.mockImplementation(() =>
        Promise.resolve(true)
      );
      usersDbMock.getByEmail.mockImplementation(() => Promise.resolve(true));

      //Act
      const response = await request(app)
        .post("/auth/signup")
        .send(userSignUpInput);

      //Assert
      expect(response.statusCode).toBe(409);
      expect(response.body).toMatchObject(errorResponse);
      expect(
        validationMock.userValidation && usersDbMock.getByEmail
      ).toHaveBeenCalledTimes(1);
    });
  });

  describe("GET /auth/logout", () => {
    // it("Success --> returns { statusCode 204, body: {} }", async () => {
    //   // //Act
    //   // const response = await request(app)
    //   //   .get("/auth/logout")
    //   //   .expect(204);
    //   // //Assert
    //   // expect(response.body).toStrictEqual({});
    // });
    // it("Invalid or missing accessToken --> return { statusCode 401, body: { error: message } }", async () => {
    //   //Arrange
    //   const responseBody = {
    //     statusCode: 401,
    //     body: {
    //       error: expect.any(String)
    //     }
    //   };
    //   //Act
    //   const response = await request(app)
    //     .get("/auth/logout")
    //     .expect("Content-Type", /json/)
    //     .expect("Set-Cookie", /accessToken/)
    //     .expect("Set-Cookie", /refreshToken/)
    //     .expect(401);
    //   //Assert
    //   expect(response.body).toEqual(expect.objectContaining(responseBody));
  });

  describe("POST /auth/login", () => {
    // it("Success --> return { statusCode 200, body: { user } }", async () => {
    //   //Arrange
    //   const requestBody = { email: "test@gmail.com", password: "test123" };
    //   const responseBody = {
    //     username: expect.any(String),
    //     email: expect.any(String),
    //     _id: expect.any(String),
    //     updatedAt: expect.any(String),
    //     createdAt: expect.any(String)
    //   };
    //   //Act
    //   const response = await request(app)
    //     .post("/auth/login")
    //     .send(requestBody)
    //     .expect("Content-Type", /json/)
    //     .expect("Set-Cookie", /accessToken/)
    //     .expect("Set-Cookie", /refreshToken/)
    //     .expect(200);
    //   //Assert
    //   expect(response.body).toEqual(expect.objectContaining(responseBody));
  });

  // it("Invalid or missing email/password --> return { statusCode 401, body: { error: message } }", async () => {
  // //Arrange
  // const requestBody = {
  //   email: "badmail@gmail.com",
  //   password: "badpassword123"
  // };
  // const responseBody = {
  //   statusCode: 401,
  //   body: {
  //     error: expect.any(String)
  //   }
  // };
  // //Act
  // const response = await request(app)
  //   .post("/auth/login")
  //   .send(requestBody)
  //   .expect("Content-Type", /json/)
  //   .expect(401);
  // //Assert
  // expect(response.body).toEqual(expect.objectContaining(responseBody));
  // });
});

// afterAll(() => {
//   app.quit();
// });
