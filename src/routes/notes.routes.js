import express from "express";
import notesController from "../controllers/notes/index.controller.js";
import expressCallback from "../helpers/expressCallback.js";
import authExpressMiddleware from "../helpers/authExpressMiddleware.js";

const router = express.Router();

router

  /**
   * @openapi
   * '/notes':
   *  get:
   *   tags:
   *   - Notes
   *   security:
   *    - cookieAuth: []
   *   summary: Get all notes created by the user that is currently logged in. User Id is retrieved from the access token.
   *   responses:
   *    200:
   *     description: Notes successfully retrieved.
   *     content:
   *      application/json:
   *       schema:
   *        $ref: '#/components/schemas/UpdateNoteResponse'
   *    400:
   *      description: Bad Request
   *      content:
   *       application/json:
   *        schema:
   *         $ref: '#/components/schemas/BadRequestError'
   *    403:
   *      description: Forbidden
   *      content:
   *        application/json:
   *          schema:
   *           $ref: '#/components/schemas/ForbiddenError'
   */

  .get("/", authExpressMiddleware, expressCallback(notesController.getNotes))

  /**
   * @openapi
   * '/notes':
   *  post:
   *   tags:
   *   - Notes
   *   security:
   *    - cookieAuth: []
   *   summary: Create new note
   *   requestBody:
   *    required: true
   *    content:
   *     application/json:
   *      schema:
   *       $ref: '#/components/schemas/CreateNote'
   *   responses:
   *    201:
   *     description: Note created successfully
   *     content:
   *      application/json:
   *       schema:
   *        $ref: '#/components/schemas/CreateNoteResponse'
   *    400:
   *      description: Bad Request
   *      content:
   *       application/json:
   *        schema:
   *         $ref: '#/components/schemas/BadRequestError'
   *    403:
   *      description: Forbidden
   *      content:
   *        application/json:
   *          schema:
   *           $ref: '#/components/schemas/ForbiddenError'
   */

  .post("/", authExpressMiddleware, expressCallback(notesController.postNote))

  /**
   * @openapi
   * '/notes/{noteId}':
   *  delete:
   *   tags:
   *   - Notes
   *   security:
   *    - cookieAuth: []
   *   summary: Delete note
   *   parameters:
   *   - name: noteId
   *     in: path
   *     description: Id of the note to delete
   *     required: true
   *   responses:
   *    204:
   *     description: Note deleted successfully
   *     content:
   *      application/json:
   *       schema:
   *        $ref: '#/components/schemas/DeleteNoteResponse'
   *    400:
   *      description: Bad Request
   *      content:
   *       application/json:
   *        schema:
   *         $ref: '#/components/schemas/BadRequestError'
   *    403:
   *      description: Forbidden
   *      content:
   *        application/json:
   *          schema:
   *           $ref: '#/components/schemas/ForbiddenError'
   */

  .delete(
    "/:id",
    authExpressMiddleware,
    expressCallback(notesController.deleteNote)
  )

  /**
   * @openapi
   * '/notes/{noteId}':
   *  patch:
   *   tags:
   *   - Notes
   *   security:
   *    - cookieAuth: []
   *   summary: Update note
   *   parameters:
   *   - name: noteId
   *     in: path
   *     description: Id of the note to update
   *     required: true
   *   requestBody:
   *    required: true
   *    content:
   *     application/json:
   *      schema:
   *       $ref: '#/components/schemas/UpdateNote'
   *   responses:
   *    200:
   *     description: Note updated successfully
   *     content:
   *      application/json:
   *       schema:
   *        $ref: '#/components/schemas/UpdateNoteResponse'
   *    400:
   *      description: Bad Request
   *      content:
   *       application/json:
   *        schema:
   *         $ref: '#/components/schemas/BadRequestError'
   *    403:
   *      description: Forbidden
   *      content:
   *        application/json:
   *          schema:
   *           $ref: '#/components/schemas/ForbiddenError'
   */

  //TODO: add 404 not found error
  .patch(
    "/:id",
    authExpressMiddleware,
    expressCallback(notesController.patchNote)
  );

export default router;
