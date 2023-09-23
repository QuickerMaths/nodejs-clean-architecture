import jwt from "../../__mocks__/jsonwebtoken/jsonwebtoken.js";
import refreshTokenDbMock from "../../__mocks__/data-access/refresh-token/index.db.mock";

import request from "supertest";
import createServer from "../../server.js";
import userUtils from "../../utils/test-utilities/users.utils.js";

const app = createServer();

describe("refresh token route", () => {
  describe("GET /auth/refresh-token", () => {
    it("Success --> return { accessToken }", async () => {
      //Arrange
      const { userId } = userUtils;
      jwt.decode.mockImplementation(() => userId);
      refreshTokenDbMock.findByProperty.mockImplementation(() =>
        Promise.resolve("token")
      );
      jwt.verify.mockImplementation(() => Promise.resolve("token"));

      //Act
      const response = await request(app)
        .get("/refresh-token")
        .set("set-cookie", [
          "refreshToken=token; Path=/; HttpOnly; Secure; SameSite=None"
        ]);

      //Assert
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ accessToken: "token" });
      expect(response.toJSON().req.headers).toHaveProperty("set-cookie");
      expect(
        jwt.decode && refreshTokenDbMock.findByProperty && jwt.verify
      ).toHaveBeenCalledTimes(1);
    });

    it("Missing refreshToken cookie --> return { statusCode 403, body: { error: message } }", async () => {
      //Arrange
      const { errorResponse } = userUtils;
      jwt.decode.mockImplementation(() => undefined);

      //Act
      const response = await request(app).get("/refresh-token");

      //Assert
      expect(response.statusCode).toBe(403);
      expect(response.body).toMatchObject(errorResponse);
      expect(response.toJSON().req.headers).not.toHaveProperty("set-cookie");
      expect(jwt.decode).toHaveBeenCalledTimes(1);
    });

    it("Refresh token doesn't exist in data base --> return { statusCode 403, body: { error: message } }", async () => {
      //Arrange
      const { errorResponse, userId } = userUtils;
      jwt.decode.mockImplementation(() => Promise.resolve(userId));
      refreshTokenDbMock.findByProperty.mockImplementation(() =>
        Promise.resolve(null)
      );
      //Act
      const response = await request(app)
        .get("/refresh-token")
        .set("set-cookie", [
          "refreshToken=invalidToken; Path=/; HttpOnly; Secure; SameSite=None"
        ]);

      //Assert
      expect(response.statusCode).toBe(403);
      expect(response.body).toMatchObject(errorResponse);
      expect(response.toJSON().req.headers).toHaveProperty("set-cookie");
      expect(
        jwt.decode && refreshTokenDbMock.findByProperty
      ).toHaveBeenCalledTimes(1);
    });

    it("Refresh token expired --> return { statusCode 403, body: { error: message } }", async () => {
      //Arrange
      const { errorResponse, userId } = userUtils;
      jwt.decode.mockImplementation(() => Promise.resolve(userId));
      refreshTokenDbMock.findByProperty.mockImplementation(() =>
        Promise.resolve("token")
      );
      jwt.verify.mockImplementation(() => Promise.resolve("expired"));
      refreshTokenDbMock.remove.mockImplementation(() => Promise.resolve({}));

      //Act
      const response = await request(app)
        .get("/refresh-token")
        .set("set-cookie", [
          "refreshToken=expiredToken; Path=/; HttpOnly; Secure; SameSite=None"
        ]);

      //Assert
      expect(response.statusCode).toBe(403);
      expect(response.body).toMatchObject(errorResponse);
      expect(response.toJSON().req.headers).toHaveProperty("set-cookie");
      expect(response.headers).not.toHaveProperty("set-cookie");
      expect(
        jwt.decode &&
          refreshTokenDbMock.findByProperty &&
          jwt.verify &&
          refreshTokenDbMock.remove
      ).toHaveBeenCalledTimes(1);
    });
  });
});
