export default function makeLoginGetUser(loginUser) {
  return async function loginGetUser(httpRequest) {
    const tokenPair = await loginUser({
      email: httpRequest.body.email,
      password: httpRequest.body.password,
    });

    return {
      statusCode: 200,
      cookies: [
        {
          name: "refreshToken",
          value: tokenPair.refreshToken,
          options: {
            httpOnly: true,
            sameSite: "none",
            secure: true,
          },
        },
        {
          name: "accessToken",
          value: tokenPair.accessToken,
          options: {
            httpOnly: true,
            sameSite: "none",
            secure: true,
          },
        },
      ],
      body: {},
    };
  };
}
