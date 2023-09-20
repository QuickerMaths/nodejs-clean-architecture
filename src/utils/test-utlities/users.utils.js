import mongoose from "mongoose";

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  username: "test",
  email: "example@gmail.com",
  _id: expect.any(String),
  updatedAt: expect.any(String),
  createdAt: expect.any(String)
};

const userSignUpInput = {
  username: "test",
  email: "example@gmail.com",
  password: "test123"
};

const userSignUpWrongInput = { username: "testuser", email: "test@gmail.com" };

const userLoginInput = {
  email: "example@gmail.com",
  password: "test123"
};

const userWrongLogin = {
  email: "wrong@gmail.com",
  password: "wrong123"
};

const errorResponse = {
  statusCode: expect.any(Number),
  body: {
    error: expect.any(String)
  }
};

const userUtils = Object.freeze({
  userId,
  userPayload,
  userSignUpInput,
  userSignUpWrongInput,
  userLoginInput,
  userWrongLogin,
  errorResponse
});

export default userUtils;
