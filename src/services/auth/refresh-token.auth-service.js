import axios from "axios";
import { ForbiddenError } from "../../utils/errors/ForbiddenError.js";

export default function refreshTokenService() {
  /**
   * The function `getNewAccessToken` makes an HTTP GET request to a server endpoint to refresh an
   * access token using a provided refresh token.
   *
   * @param refreshToken - The `refreshToken` parameter is a token that is used to obtain a new access
   * token. It is typically issued by an authentication server and is used to refresh an expired or
   * expiring access token.
   */

  const getNewAccessToken = async (refreshToken) => {
    try {
      const {
        data: { accessToken: newAccessToken }
      } = await axios.get("http://localhost:3000/refresh-token", {
        withCredentials: true,
        headers: {
          Cookie: [`refreshToken=${refreshToken}`]
        }
      });

      return newAccessToken;
    } catch (err) {
      if (err.response) {
        throw new ForbiddenError(err.response.data.body.error);
      } else {
        throw new ForbiddenError("Invalid refresh token");
      }
    }
  };

  return Object.freeze({
    getNewAccessToken
  });
}
