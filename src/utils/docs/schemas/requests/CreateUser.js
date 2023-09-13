/**
 * @openapi
 * components:
 *  schemas:
 *   CreateUser:
 *    type: object
 *
 *    required:
 *    - username
 *    - email
 *    - password
 *
 *    properties:
 *     username:
 *      type: String
 *      minLength: 3
 *      maxLength: 20
 *      default: John Doe
 *
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
