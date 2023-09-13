/**
 * @openapi
 * components:
 *  schemas:
 *   LoginUser:
 *    type: object
 *
 *    required:
 *    - email
 *    - password
 *
 *    properties:
 *     email:
 *      type: String
 *      format: email
 *      default: example123@mail.com
 *
 *     password:
 *      type: string
 *      format: password
 *      minLength: 6
 *      maxLength: 20
 *      default: password123
 */
