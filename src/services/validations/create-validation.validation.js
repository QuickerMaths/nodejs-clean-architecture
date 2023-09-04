export default function makeValidation(validator, schema) {
  return function validation(note) {
    const validate = validator.compile(schema);
    const isValid = validate(note);

    if (!isValid) {
      console.log(validate.errors);

      return validate.errors.map(
        (error) => `${error.instancePath} ${error.message}`
      );
    }

    return;
  };
}
