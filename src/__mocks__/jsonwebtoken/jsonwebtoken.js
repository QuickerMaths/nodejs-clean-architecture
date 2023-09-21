jest.mock("jsonwebtoken", () => ({
  ...jest.requireActual("jsonwebtoken"),
  sign: jest.fn(),
  verify: jest.fn(),
  decode: jest.fn()
}));

import jwt from "jsonwebtoken";

export default jwt;
