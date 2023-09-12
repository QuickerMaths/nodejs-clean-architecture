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
