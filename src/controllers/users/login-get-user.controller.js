export default function makeLoginGetUser(loginUser) {
  return async function loginGetUser(httpRequest) {
    const tokenPair = await loginUser({
      email: httpRequest.body.email,
      password: httpRequest.body.password,
    });

    return {
      statusCode: 200,
      body: { tokenPair },
    };
  };
}
