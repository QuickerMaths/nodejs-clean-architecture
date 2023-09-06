import Ajv from "ajv";
import makeNoteValidation from "./note-validation.validation.js";
import noteSchema from "./schemas/create-note.validation-schema.js";
import userSchema from "./schemas/create-user.validation-schema.js";
import makeUserValidation from "./user-validation.validation.js";

const ajv = new Ajv();

const noteValidation = makeNoteValidation(ajv, noteSchema);
const userValidation = makeUserValidation(ajv, userSchema);

const validations = Object.freeze({
  noteValidation,
  userValidation,
});

export default validations;

export { noteValidation, userValidation };
