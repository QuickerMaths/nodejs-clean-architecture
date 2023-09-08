import { ForbiddenError } from "../../utils/errors/ForbiddenError.js";

export default function makePostRefreshToken(verifyRefreshToken) {
  return async function postRefreshToken(httpRequest) {
    const refreshToken = httpRequest.cookies.refreshToken;

    if (!refreshToken) {
      throw new ForbiddenError("Forbidden", 403, "Credentials missing.", true);
    }

    const tokenPair = await verifyRefreshToken(refreshToken);

    return {
      statusCode: 200,
      body: {
        tokenPair,
      },
    };
  };
}
