import Ajv from "ajv";
import makeValidation from "./create-validation.validation.js";
import createNoteSchema from "./schemas/create-note.validation-schema.js";

const ajv = new Ajv();

const createNoteValidation = makeValidation(ajv, createNoteSchema);

const noteValidations = Object.freeze({
  createNoteValidation,
});

export default noteValidations;

export { createNoteValidation };
