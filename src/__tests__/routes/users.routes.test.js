import request from "supertest";
import createServer from "../../../src/server.js";
import userUtils from "../utils/users.utils.js";

jest.mock("../../data-access/users/index.db.js", () => {
  return {
    insert: jest
      .fn()
      .mockImplementation((userSignUpPayload) => userSignUpPayload)
  };
});

import usersDb from "../../data-access/users/index.db.js";

const app = createServer();

describe("users router", () => {
  describe("POST /auth/signup", () => {
    it("Success --> return { statusCode 201, body: { user } }", async () => {
      //Arrange
      const { userSignUpInput, userSignUpPayload } = userUtils;
      const createNewUser = new usersDb.insert(userSignUpPayload);
      console.log(createNewUser);
      //Act
      const response = await request(app)
        .post("/auth/signup")
        .send(userSignUpInput)
        .expect("Content-Type", /json/)
        .expect(201);
      //Assert
      expect(createNewUser).toHaveBeenCalledTimes(1);
      expect(response.body).toEqual(expect.objectContaining(userSignUpPayload));
    });

    it("Missing input field or validation rules violation --> return { statusCode 400, body: { error: message } }", async () => {
      // //Arrange
      // const requestBody = { username: "testuser", email: "test@gmail.com" };
      // const responseBody = {
      //   statusCode: 400,
      //   body: {
      //     error: expect.any(String)
      //   }
      // };
      // //Act
      // const response = await request(app)
      //   .post("/auth/signup")
      //   .send(requestBody)
      //   .expect("Content-Type", /json/)
      //   .expect(400);
      // //Act
      // expect(response.body).toEqual(expect.objectContaining(responseBody));
    });

    it("Email duplication --> return { statusCode 409, body: { error: message } }", async () => {
      // //Arrange
      // const requestBody = {
      //   username: "testuser",
      //   email: "test@gmail.com",
      //   password: "test123"
      // };
      // const responseBody = {
      //   statusCode: 409,
      //   body: {
      //     error: expect.any(String)
      //   }
      // };
      // //Act
      // const response = await request(app)
      //   .post("/auth/signup")
      //   .send(requestBody)
      //   .expect("Content-Type", /json/)
      //   .expect(409);
      // //Assert
      // expect(response.body).toEqual(expect.objectContaining(responseBody));
      // });
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
