import { ForbiddenError } from "../../utils/errors/ForbiddenError.js";

export default function makeGetRefreshToken(verifyRefreshToken) {
  return async function getRefreshToken(httpRequest) {
    const refreshToken = httpRequest.cookies.refreshToken;

    if (!refreshToken) {
      throw new ForbiddenError("Forbidden", 403, "Credentials missing.", true);
    }

    const { accessToken } = await verifyRefreshToken(refreshToken);

    return {
      statusCode: 200,
      body: {
        accessToken,
      },
    };
  };
}
