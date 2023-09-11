export default function makeLoginGetUser(loginUser) {
  return async function loginGetUser(httpRequest) {
    console.log(httpRequest);
    const tokenPair = await loginUser({
      email: httpRequest.body.email,
      password: httpRequest.body.password,
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Allow-Control-Allow-Origin": "*",
      },
      cookies: [
        {
          name: "refreshToken",
          value: tokenPair.refreshToken,
          options: {
            httpOnly: true,
          },
        },
        {
          name: "accessToken",
          value: tokenPair.accessToken,
          options: {
            httpOnly: true,
          },
        },
      ],
      body: {},
    };
  };
}
