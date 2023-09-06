export default function makeLoginGetUser(loginUser) {
  return async function loginGetUser(httpRequest) {
    const user = await loginUser({
      email: httpRequest.body.email,
      password: httpRequest.body.password,
    });

    return {
      statusCode: 200,
      body: { user },
    };
  };
}
