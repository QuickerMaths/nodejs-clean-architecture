/**
 * The function `makeLoginGetUser` is a higher-order function that takes in a `loginUser` function and
 * returns an async function `loginGetUser` that handles the login process and returns a response
 * object with cookies and an empty body.
 *
 * @returns The function `makeLoginGetUser` returns an asynchronous function `loginGetUser`.
 */
export default function makeLoginGetUser({ loginUser }) {
  return async function loginGetUser(httpRequest) {
    const { user, tokenPair } = await loginUser({
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
      body: user,
    };
  };
}
