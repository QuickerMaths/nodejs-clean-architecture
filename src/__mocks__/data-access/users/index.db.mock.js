jest.mock("../../../data-access/users/index.db.js", () => {
  return {
    insert: jest.fn(),
    getByEmail: jest.fn(),
    getById: jest.fn()
  };
});

import usersDbMock from "../../../data-access/users/index.db.js";

export default usersDbMock;
