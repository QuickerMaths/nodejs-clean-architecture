import noteDbMock from "../../__mocks__/data-access/notes/index.db.mock.js";
import jwt from "../../__mocks__/jsonwebtoken/jsonwebtoken.js";

import request from "supertest";
import createServer from "../../server.js";
import notesUtilities from "../../utils/test-utilities/notes.utils.js";
import userUtils from "../../utils/test-utilities/users.utils.js";
import notesDbMock from "../../__mocks__/data-access/notes/index.db.mock.js";

const app = createServer();

describe("notes route", () => {
  describe("GET /notes", () => {
    it("Success --> return { statusCode: 200, body: { notes } }", async () => {
      //Arrange
      const { noteResponseArray } = notesUtilities;
      const { userDecodedToken } = userUtils;
      jwt.verify.mockImplementation(() => userDecodedToken);
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
    it("Success --> return { statusCode: 201, body: { note } }", async () => {
      //Arrange
      const { noteResponse, createNoteRequest } = notesUtilities;
      const { userDecodedToken } = userUtils;
      jwt.verify.mockImplementation(() => userDecodedToken);
      noteDbMock.insert.mockImplementation(() => Promise.resolve(noteResponse));

      //Act
      const response = await request(app)
        .post("/notes")
        .send(createNoteRequest)
        .set("set-cookies", [
          "refreshToken=token; Path=/; HttpOnly; Secure; SameSite=None",
          "accessToken=token; Path=/; HttpOnly; Secure; SameSite=None"
        ]);

      //Assert
      expect(response.statusCode).toBe(201);
      expect(response.body).toEqual(noteResponse);
      expect(jwt.verify && noteDbMock.insert).toHaveBeenCalledTimes(1);
    });

    it("Missing input field or validation rules violation --> return { statusCode 400, body: { error: message } }", async () => {
      //Arrange
      const { createNoteBadRequest } = notesUtilities;
      const { errorResponse, userDecodedToken } = userUtils;
      jwt.verify.mockImplementation(() => userDecodedToken);

      //Act
      const response = await request(app)
        .post("/notes")
        .send(createNoteBadRequest)
        .set("set-cookies", [
          "refreshToken=token; Path=/; HttpOnly; Secure; SameSite=None",
          "accessToken=token; Path=/; HttpOnly; Secure; SameSite=None"
        ]);

      //Assert
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual(errorResponse);
      expect(jwt.verify).toHaveBeenCalledTimes(1);
    });
  });

  describe("DELETE /notes/:id", () => {
    it("Success --> return { statusCode: 204, body: { } }", async () => {
      //Arrange
      const { userDecodedToken, noteId } = userUtils;
      jwt.verify.mockImplementation(() => userDecodedToken);
      noteDbMock.remove.mockImplementation(() => Promise.resolve({}));

      //Act
      const response = await request(app)
        .delete(`/notes/${noteId}`)
        .set("set-cookies", [
          "refreshToken=token; Path=/; HttpOnly; Secure; SameSite=None",
          "accessToken=token; Path=/; HttpOnly; Secure; SameSite=None"
        ]);

      //Assert
      expect(response.statusCode).toBe(204);
      expect(response.body).toEqual({});
      expect(jwt.verify && noteDbMock.remove).toHaveBeenCalledTimes(1);
    });

    it("Note with given id not found --> return { statusCode: 404, body: { error: message } }", async () => {
      //Arrange
      const { noteId } = notesUtilities;
      const { errorResponse } = userUtils;
      notesDbMock.remove.mockImplementation(() => Promise.resolve(null));

      //Act
      const response = await request(app)
        .delete(`/notes/${noteId}`)
        .set("set-cookies", [
          "refreshToken=token; Path=/; HttpOnly; Secure; SameSite=None",
          "accessToken=token; Path=/; HttpOnly; Secure; SameSite=None"
        ]);

      //Assert
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(errorResponse);
      expect(jwt.verify && notesDbMock.remove).toHaveBeenCalledTimes(1);
    });
  });

  describe("PATCH /notes/:id", () => {
    it("Success --> return { statusCode: 200, body: { updatedNote } }", async () => {
      //Arrange
      const { noteId, updateNoteRequest, updateNoteResponse } = notesUtilities;
      const { userDecodedToken } = userUtils;
      jwt.verify.mockImplementation(() => userDecodedToken);
      noteDbMock.update.mockImplementation(() =>
        Promise.resolve(updateNoteResponse)
      );

      //Act
      const response = await request(app)
        .patch(`/notes/${noteId}`)
        .send(updateNoteRequest)
        .set("set-cookies", [
          "refreshToken=token; Path=/; HttpOnly; Secure; SameSite=None",
          "accessToken=token; Path=/; HttpOnly; Secure; SameSite=None"
        ]);

      //Assert
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(updateNoteResponse);
      expect(jwt.verify && noteDbMock.update).toHaveBeenCalledTimes(1);
    });

    it("Missing input field or validation rules violation --> return { statusCode: 400, body: { error: message } }", async () => {
      //Arrange
      const { noteId, updateNoteRequestWithInvalidTitle } = notesUtilities;
      const { errorResponse } = userUtils;

      //Act
      const response = await request(app)
        .patch(`/notes/${noteId}`)
        .send(updateNoteRequestWithInvalidTitle)
        .set("set-cookies", [
          "refreshToken=token; Path=/; HttpOnly; Secure; SameSite=None",
          "accessToken=token; Path=/; HttpOnly; Secure; SameSite=None"
        ]);

      //Assert
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual(errorResponse);
    });

    it("Note with given id not found --> return { statusCode: 404, body: { error: message } }", async () => {
      //Arrange
      const { noteId } = notesUtilities;
      const { errorResponse } = userUtils;
      notesDbMock.update.mockImplementation(() => Promise.resolve(null));

      //Act
      const response = await request(app)
        .patch(`/notes/${noteId}`)
        .set("set-cookies", [
          "refreshToken=token; Path=/; HttpOnly; Secure; SameSite=None",
          "accessToken=token; Path=/; HttpOnly; Secure; SameSite=None"
        ]);

      //Assert
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual(errorResponse);
      expect(jwt.verify && notesDbMock.update).toHaveBeenCalledTimes(1);
    });
  });

  describe("User verification fails for one of endpoints", () => {
    it("User verification fails --> return { statusCode 403, body: { error: message } }", async () => {
      //Arrange
      const { errorResponse } = userUtils;
      jwt.verify.mockImplementation(() => undefined);

      //Act
      const response = await request(app)
        .get("/notes")
        .set("set-cookies", [
          "refreshToken=invalidToken; Path=/; HttpOnly; Secure; SameSite=None",
          "accessToken=missingToken; Path=/; HttpOnly; Secure; SameSite=None"
        ]);

      //Assert
      expect(response.statusCode).toBe(403);
      expect(response.body).toEqual(errorResponse);
      expect(jwt.verify).toHaveBeenCalledTimes(1);
    });
  });
});
