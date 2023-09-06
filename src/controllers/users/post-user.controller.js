export default function makePostUser(addUser) {
  return async function postUser(httpRequest) {
    const toAdd = {
      username: httpRequest.body.username,
      email: httpRequest.body.email,
      password: httpRequest.body.password,
    };

    const user = await addUser(toAdd);

    return {
      statusCode: 201,
      body: { user },
    };
  };
}
