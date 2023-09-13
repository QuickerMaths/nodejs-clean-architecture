/**
 * @openapi
 * components:
 *  schemas:
 *   DuplicateError:
 *    type: object
 *
 *    properties:
 *     statusCode:
 *      type: number
 *      default: 409
 *
 *     body:
 *      type: object
 *
 *      properties:
 *       error:
 *        type: string
 *        default: This email is already in use
 */
