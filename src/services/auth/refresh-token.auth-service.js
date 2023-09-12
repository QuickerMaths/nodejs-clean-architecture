import axios from "axios";

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
      return err;
    }
  };

  return Object.freeze({
    getNewAccessToken,
  });
}
