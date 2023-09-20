jest.mock("../../../data-access/users/index.db.js", () => {
  return {
    insert: jest.fn().mockImplementation(() =>
      Promise.resolve({
        _id: "5f8fdecbcbf3b1f235f3b1f2",
        username: "test",
        email: "example@gmail.com",
        password: "test123",
        createdAt: "2020-10-20T15:00:59.000Z",
        updatedAt: "2020-10-20T15:00:59.000Z"
      })
    ),
    getByEmail: jest.fn(),
    getById: jest.fn()
  };
});

import usersDbMock from "../../../data-access/users/index.db.js";

export default usersDbMock;
