import makePostUser from "./post-user.controller";

describe("post user controller", () => {
  it("returns postUser function", async () => {
    const addUser = () => {};
    const postUser = makePostUser({ addUser });

    expect(postUser).toBeInstanceOf(Function);
  });
});
