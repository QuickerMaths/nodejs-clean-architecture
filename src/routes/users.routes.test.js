import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import createServer from "../server.js";

const app = createServer();

beforeAll(async () => {
  const mongoDB = await MongoMemoryServer.create();

  await mongoose.connect(mongoDB.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("users router", () => {
  describe("GET /auth/logout", () => {
    it("Success --> returns { statusCode 204, body: {} }", async () => {
      // //Act
      // const response = await request(app)
      //   .get("/auth/logout")
      //   .expect("Content-Type", /json/)
      //   .expect("Set-Cookie", /accessToken/)
      //   .expect("Set-Cookie", /refreshToken/)
      //   .expect(204);
      //   //Assert
      // expect(response.body).toStrictEqual({});
    });

    it("Invalid or missing accessToken --> return { statusCode 401, body: { error: message } }", async () => {});
  });

  describe("POST /auth/login", () => {
    it("Success --> return { statusCode 200, body: { user } }", async () => {
      //Arrange
      const requestBody = { email: "test@gmail.com", password: "test123" };
      const responseBody = {
        username: expect.any(String),
        email: expect.any(String),
        _id: expect.any(String),
        updatedAt: expect.any(String),
        createdAt: expect.any(String),
      };

      //Act
      const response = await request(app)
        .post("/auth/login")
        .send(requestBody)
        .set("Content-Type", "application/json")
        .expect("Content-Type", /json/)
        .expect("Set-Cookie", /accessToken/)
        .expect("Set-Cookie", /refreshToken/)
        .expect(200);

      //Assert
      expect(response.body).toEqual(expect.objectContaining(responseBody));
    });

    it("Invalid or missing email/password --> return { statusCode 401, body: { error: message } }", async () => {
      //Arrange
      const requestBody = {
        email: "badmail@gmail.com",
        password: "badpassword123",
      };
      const responseBody = {
        statusCode: 401,
        body: {
          error: expect.any(String),
        },
      };

      //Act
      const response = await request(app)
        .post("/auth/login")
        .send(requestBody)
        .expect("Content-Type", /json/)
        .expect(401);

      //Assert

      expect(response.body).toEqual(expect.objectContaining(responseBody));
    });
  });

  describe("POST /auth/signup", () => {
    it("Success --> return { statusCode 201, body: { user } }", async () => {
      // //Arrange
      // const requestBody = {
      //   username: "testuser",
      //   email: "test@gmail.com",
      //   password: "test123",
      // };
      // const responseBody = {
      //   username: expect.any(String),
      //   email: expect.any(String),
      //   _id: expect.any(String),
      //   updatedAt: expect.any(String),
      //   createdAt: expect.any(String),
      // };
      // //Act
      // const response = await request(app)
      //   .post("/auth/signup")
      //   .send(requestBody)
      //   .expect("Content-Type", /json/)
      //   .expect(201);
      // //Assert
      // expect(response.body).toEqual(expect.objectContaining(responseBody));
    });

    it("Missing input field or validation rules violation --> return { statusCode 400, body: { error: message } }", async () => {
      //Arrange
      const requestBody = {
        username: "testuser",
        email: "test@gmail.com",
      };
      const responseBody = {
        statusCode: 400,
        body: {
          error: expect.any(String),
        },
      };

      //Act
      const response = await request(app)
        .post("/auth/signup")
        .send(requestBody)
        .expect("Content-Type", /json/)
        .expect(400);

      //Act
      expect(response.body).toEqual(expect.objectContaining(responseBody));
    });

    it("Email duplication --> return { statusCode 409, body: { error: message } }", async () => {
      //Arrange
      const requestBody = {
        username: "testuser",
        email: "test@gmail.com",
        password: "test123",
      };
      const responseBody = {
        statusCode: 409,
        body: {
          error: expect.any(String),
        },
      };

      //Act
      const response = await request(app)
        .post("/auth/signup")
        .send(requestBody)
        .expect("Content-Type", /json/)
        .expect(409);

      //Assert
      expect(response.body).toEqual(expect.objectContaining(responseBody));
    });
  });
});

// afterAll(() => {
//   app.quit();
// });
