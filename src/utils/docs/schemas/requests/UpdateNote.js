/**
 * @openapi
 * components:
 *  schemas:
 *   UpdateNote:
 *    type: object
 *
 *    properties:
 *     title:
 *      type: String
 *      minLength: 10
 *      maxLength: 100
 *      default: This is note title
 *
 *     content:
 *      type: String
 *      minLength: 10
 *      maxLength: 1000
 *      default: This is note content
 *
 *     important:
 *      type: boolean
 */
