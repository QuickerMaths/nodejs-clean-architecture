import axios from "axios";
import { ForbiddenError } from "../../utils/errors/ForbiddenError.js";

export default function refreshTokenService() {
  const getNewAccessToken = async (refreshToken) => {
    try {
      const {
        data: { accessToken: newAccessToken },
      } = await axios.get("http://localhost:3000/refresh-token", {
        withCredentials: true,
        headers: {
          Cookie: [`refreshToken=${refreshToken}`],
        },
      });

      return newAccessToken;
    } catch (err) {
      if (err.response) {
        throw new ForbiddenError(
          "Forbidden.",
          err.response.data.statusCode,
          err.response.data.body.error,
          true
        );
      } else {
        throw new ForbiddenError(
          "Forbidden.",
          403,
          "Invalid refresh token",
          true
        );
      }
    }
  };

  return Object.freeze({
    getNewAccessToken,
  });
}
