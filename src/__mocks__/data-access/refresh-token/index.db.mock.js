jest.mock("../../../data-access/refresh-token/index.db.js", () => ({
  insert: jest.fn(),
  findByProperty: jest.fn(),
  remove: jest.fn()
}));

import refreshTokenDbMock from "../../../data-access/refresh-token/index.db.js";

export default refreshTokenDbMock;
