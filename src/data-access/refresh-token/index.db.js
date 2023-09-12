import makeRefreshTokenDb from "./refresh-token.db.js";
import RefreshToken from "../../models/refreshToken.model.js";

const refreshTokenDb = makeRefreshTokenDb({ model: RefreshToken });

export default refreshTokenDb;
