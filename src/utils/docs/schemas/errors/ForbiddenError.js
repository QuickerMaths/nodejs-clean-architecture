/**
 * @openapi
 * components:
 *  schemas:
 *   ForbiddenError:
 *    type: object
 *
 *    properties:
 *     statusCode:
 *      type: number
 *      default: 403
 *
 *     body:
 *      type: object
 *
 *      properties:
 *       error:
 *        type: string
 *        default: Forbidden
 */
