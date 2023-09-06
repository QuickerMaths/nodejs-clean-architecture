import {
  FieldRequiredError,
  ValidationError,
  InvalidEmail,
} from "../../utils/errors/index.errors.js";

export default function makeUserValidation(validator, schema) {
  return function validation(user) {
    const validate = validator.compile(schema);
    const isValid = validate(user);

    if (!isValid) {
      validate.errors.map((error) => {
        if (error.keyword === "required") {
          throw new FieldRequiredError(
            "Field Required Error",
            400,
            error.message,
            true
          );
        } else if (
          error.keyword === "minLength" ||
          error.keyword === "maxLength"
        ) {
          throw new ValidationError(
            "Validation Error",
            400,
            `${error.instancePath} ${error.message}`,
            true
          );
        } else if (error.keyword === "format") {
          throw new InvalidEmail(
            "Invalid Email Format",
            400,
            `${error.params.format} ${error.message}`,
            true
          );
        }
      });
    }

    return;
  };
}
