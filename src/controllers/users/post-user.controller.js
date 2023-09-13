/**
 * The function `makePostUser` is an asynchronous function that takes an `addUser` function as a
 * parameter and returns a function that handles the creation of a new user.
 *
 * @returns The function `makePostUser` returns an asynchronous function `postUser`.
 */

export default function makePostUser({ addUser }) {
  return async function postUser(httpRequest) {
    const user = await addUser({
      username: httpRequest.body.username,
      email: httpRequest.body.email,
      password: httpRequest.body.password,
    });

    return {
      statusCode: 201,
      body: { user },
    };
  };
}
