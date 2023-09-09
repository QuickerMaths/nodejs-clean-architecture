import { ForbiddenError } from "../../utils/errors/ForbiddenError.js";

export default function makePostRefreshToken(verifyRefreshToken) {
  return async function postRefreshToken(httpRequest) {
    const refreshToken = httpRequest.cookies.refreshToken;

    if (!refreshToken) {
      throw new ForbiddenError("Forbidden", 403, "Credentials missing.", true);
    }

    const { decoded: accessToken } = await verifyRefreshToken(refreshToken);

    return {
      statusCode: 200,
      cookies: [
        {
          name: "refreshToken",
          value: refreshToken,
          options: {
            httpOnly: true,
          },
        },
        {
          name: "accessToken",
          value: accessToken,
          options: {
            httpOnly: true,
          },
        },
      ],
      body: {},
    };
  };
}
