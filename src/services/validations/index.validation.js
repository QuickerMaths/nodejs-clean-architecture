import Ajv from "ajv";
import addFormats from "ajv-formats";
import makeNoteValidation from "./note-validation.validation.js";
import makeUserValidation from "./user-validation.validation.js";
import {
  createNoteSchema,
  updateNoteSchema,
} from "./schemas/note.validation-schema.js";
import userSchema from "./schemas/user.validation-schema.js";

const ajv = new Ajv();
addFormats(ajv, ["email"]);

const createNoteValidation = makeNoteValidation(ajv, createNoteSchema);
const updateNoteValidation = makeNoteValidation(ajv, updateNoteSchema);
const userValidation = makeUserValidation(ajv, userSchema);

const validations = Object.freeze({
  createNoteValidation,
  updateNoteValidation,
  userValidation,
});

export default validations;
