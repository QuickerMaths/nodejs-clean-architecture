jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  sign: jest.fn().mockReturnValue("token"),
  verify: jest.fn().mockReturnValue({ id: "id" }),
  decode: jest.fn()
}));

import jwt from "jsonwebtoken";

export default jwt;
