import {
  FieldRequiredError,
  ValidationError,
} from "../../utils/errors/index.errors.js";

/**
 * The function `makeNoteValidation` is a higher-order function that takes a validator and a schema as
 * arguments and returns a validation function that validates a note object against the schema using
 * the validator.
 *
 * @param validator - The `validator` parameter is a JSON Schema validator object. It is responsible
 * for compiling and validating the schema against the note object.
 *
 * @param schema - The `schema` parameter is a JSON schema that defines the structure and validation
 * rules for the `note` object. It specifies the required fields, data types, and any additional
 * constraints for the `note` object. The `validator` parameter is an instance of a JSON schema
 * validator library, such as `ajv`.
 *
 * @returns The function `makeNoteValidation` is returning another function called `validation`.
 */

export default function makeNoteValidation(validator, schema) {
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
        }
      });
    }

    return;
  };
}
