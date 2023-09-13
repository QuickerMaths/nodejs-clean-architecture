import {
  FieldRequiredError,
  ValidationError,
  InvalidEmail,
} from "../../utils/errors/index.errors.js";

/**
 * The function `makeUserValidation` takes a validator and a schema as input and returns a validation
 * function that checks if a user object is valid according to the schema.
 *
 * @param validator - The `validator` parameter is a JSON Schema validator object. It is used to
 * compile and validate the user object against the provided schema.
 *
 * @param schema - The `schema` parameter is a JSON schema that defines the structure and validation
 * rules for the user object. It specifies the expected properties, their types, and any additional
 * constraints or validations that should be applied to the user object.
 *
 * @returns The function `makeUserValidation` returns a validation function.
 */

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
