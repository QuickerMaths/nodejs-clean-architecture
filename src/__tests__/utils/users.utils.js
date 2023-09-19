import mongoose from "mongoose";

const userId = new mongoose.Types.ObjectId().toString();

const userSignUpInput = {
  username: "test",
  email: "example@gmail.com",
  password: "test123"
};

const userSignUpPayload = {
  username: "test",
  email: "example@gmail.com",
  _id: expect.any(String),
  updatedAt: expect.any(String),
  createdAt: expect.any(String)
};

const userLoginInput = {
  email: "example@gmail.com",
  password: "test123"
};

const userWrongLogin = {
  email: "wrong@gmail.com",
  password: "wrong123"
};

const userLoginPayload = {
  _id: expect.any(String),
  username: "test",
  email: "example@gmail.com",
  createdAt: expect.any(String),
  updatedAt: expect.any(String)
};

const userUtils = Object.freeze({
  userId,
  userSignUpInput,
  userSignUpPayload,
  userLoginInput,
  userWrongLogin,
  userLoginPayload
});

export default userUtils;
