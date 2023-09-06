export default function makeLoginUser(loginUser) {
  return async function loginUser(httpRequest) {
    const { email, password } = httpRequest.body;
    const user = await loginUser({ email, password });

    return {
      statusCode: 200,
      body: { user },
    };
  };
}
