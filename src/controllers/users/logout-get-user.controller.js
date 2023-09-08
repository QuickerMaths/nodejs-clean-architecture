export default function makeLogoutGetUser(logoutUser) {
  return async function logoutGetUser(httpRequest) {
    const refreshToken = httpRequest.cookies.refreshToken;

    const content = await logoutUser(refreshToken || "");

    return {
      statusCode: 204,
      body: content,
    };
  };
}
