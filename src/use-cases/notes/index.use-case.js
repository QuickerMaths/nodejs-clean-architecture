import notesDb from "../../data-access/notes/index.db.js";
import makeFindNotes from "./find-notes.use-case.js";
import makeCreateNote from "./create-note.use-case.js";
import makeRemoveNote from "./remove-note.use-case.js";
import validations from "../../services/validations/index.validation.js";

const findNotes = makeFindNotes({ notesDb });
const createNote = makeCreateNote({
  notesDb,
  validate: validations.createNoteValidation,
});
const removeNote = makeRemoveNote({ notesDb });

const notesUseCase = Object.freeze({
  findNotes,
  createNote,
  removeNote,
});

export default notesUseCase;
