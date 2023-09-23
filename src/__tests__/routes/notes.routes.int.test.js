import noteDbMock from "../../__mocks__/data-access/notes/index.db.mock.js";
import jwt from "../../__mocks__/jsonwebtoken/jsonwebtoken.js";

import request from "supertest";
import createServer from "../../server.js";
import notesUtilities from "../../utils/test-utilities/notes.utils.js";
import userUtils from "../../utils/test-utilities/users.utils.js";

const app = createServer();

describe("notes route", () => {
  describe("GET /notes", () => {
    it("Success --> return { statusCode: 200, body: { notes } }", async () => {
      //Arrange
      const { noteResponseArray } = notesUtilities;
      const { userDecodedToken } = userUtils;
      jwt.verify.mockImplementation(() => Promise.resolve(userDecodedToken));
      noteDbMock.findAllByUserId.mockImplementation(() =>
        Promise.resolve(noteResponseArray)
      );

      //Act
      const response = await request(app)
        .get("/notes")
        .set("set-cookies", [
          "refreshToken=token; Path=/; HttpOnly; Secure; SameSite=None",
          "accessToken=token; Path=/; HttpOnly; Secure; SameSite=None"
        ]);

      //Assert
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(noteResponseArray);
      expect(jwt.verify && noteDbMock.findAllByUserId).toHaveBeenCalledTimes(1);
    });
  });

  describe("POST /notes", () => {
    it("test", async () => {
      //Arrange
      //Act
      //Assert
    });
  });

  describe("DELETE /notes/:id", () => {
    it("test", async () => {
      //Arrange
      //Act
      //Assert
    });
  });

  describe("PATCH /notes/:id", () => {
    it("test", async () => {
      //Arrange
      //Act
      //Assert
    });
  });
});
