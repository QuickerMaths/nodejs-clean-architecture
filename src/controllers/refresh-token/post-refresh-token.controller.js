export default function makePostRefreshToken(verifyRefreshToken) {
  return async function postRefreshToken(httpRequest) {
    const refreshHeader = req.headers.refresh || req.headers.Refresh;

    if (!refreshHeader || !refreshHeader?.startsWith("Bearer ")) {
      throw new ForbiddenError("Forbidden", 403, "Credentials missing.", true);
    }

    const refreshToken = refreshHeader.split(" ")[1];

    const tokenPair = await verifyRefreshToken(refreshToken);

    //TODO: only send status 200, token pair send in cookies
    return {
      statusCode: 200,
      body: {
        tokenPair,
      },
    };
  };
}
