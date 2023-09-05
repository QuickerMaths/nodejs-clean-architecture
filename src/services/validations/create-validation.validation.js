import { ValidationError } from "../../helpers/errors/ValidationError.js";
import { FieldRequiredError } from "../../helpers/errors/FieldRequiredError.js";

export default function makeValidation(validator, schema) {
  return function validation(note) {
    const validate = validator.compile(schema);
    const isValid = validate(note);

    if (!isValid) {
      validate.errors.map((error) => {
        if (error.keyword === "required") {
          throw new FieldRequiredError(
            "Field Required Error",
            400,
            error.message,
            true
          );
        } else if (error.keyword === "type") {
          throw new ValidationError(
            "Validation Error",
            400,
            error.message,
            true
          );
        }
      });
    }

    return;
  };
}
