/**
 * The function `makePostUser` is an asynchronous function that takes an `addUser` function as a
 * parameter and returns a function that handles the creation of a new user.
 *
 * @returns The function `makePostUser` returns an asynchronous function `postUser`.
 */

export default function makePostUser({ createUser }) {
  return async function postUser(httpRequest) {
    const user = await createUser({ ...httpRequest.body });

    return {
      statusCode: 201,
      body: user
    };
  };
}
