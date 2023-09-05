import Ajv from "ajv";
import makeNoteValidation from "./note-validation.validation.js";
import createNoteSchema from "./schemas/create-note.validation-schema.js";

const ajv = new Ajv();

const noteValidation = makeNoteValidation(ajv, createNoteSchema);

const noteValidations = Object.freeze({
  noteValidation,
});

export default noteValidations;

export { noteValidation };
