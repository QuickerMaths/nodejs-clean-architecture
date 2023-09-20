jest.mock("../../../services/auth/index.auth-service.js", () => ({
  hash: {
    encrypt: jest.fn()
  }
}));

import authServiceMock from "../../../services/auth/index.auth-service.js";

export default authServiceMock;
