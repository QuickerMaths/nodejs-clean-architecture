import mongoose from "mongoose";

const userId = new mongoose.Types.ObjectId().toString();

const user = {
  _id: userId,
  username: "test",
  email: "example@gmail.com",
  password: "test123",
  createdAt: "2021-08-31T12:00:00.000Z",
  updatedAt: "2021-08-31T12:00:00.000Z"
};

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

const userWrongLoginInput = {
  email: "wrong@gmail.com",
  password: "wrong123"
};

const errorResponse = {
  statusCode: expect.any(Number),
  body: {
    error: expect.any(String)
  }
};

const userDecodedToken = {
  _id: userId,
  username: "test",
  email: "example@gmail.com"
};

const userUtils = Object.freeze({
  userId,
  user,
  userPayload,
  userSignUpInput,
  userSignUpWrongInput,
  userLoginInput,
  userWrongLoginInput,
  errorResponse,
  userDecodedToken
});

export default userUtils;
