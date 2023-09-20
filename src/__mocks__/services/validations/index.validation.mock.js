jest.mock("../../../services/validations/index.validation.js", () => {
  return {
    userValidation: jest.fn()
  };
});

import validationMock from "../../../services/validations/index.validation.js";

export default validationMock;
