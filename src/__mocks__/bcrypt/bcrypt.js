jest.mock("bcrypt", () => ({
  ...jest.requireActual("bcrypt"),
  hash: jest.fn().mockReturnValue("hashedPassword"),
  compareSync: jest.fn().mockReturnValue(true)
}));

import bcrypt from "bcrypt";

export default bcrypt;
