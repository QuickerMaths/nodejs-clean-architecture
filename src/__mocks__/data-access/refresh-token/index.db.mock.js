jest.mock("../../../data-access/refresh-token/index.db", () => ({
  insert: jest.fn()
}));

import refreshTokenDbMock from "../../../data-access/refresh-token/index.db";

export default refreshTokenDbMock;
