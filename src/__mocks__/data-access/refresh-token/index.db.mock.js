jest.mock("../../../data-access/refresh-token/index.db", () => ({
  insert: jest.fn(),
  remove: jest.fn().mockImplementation(() => Promise.resolve({}))
}));

import refreshTokenDbMock from "../../../data-access/refresh-token/index.db";

export default refreshTokenDbMock;
