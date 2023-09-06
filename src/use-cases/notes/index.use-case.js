import notesDb from "../../data-access/notes/index.db.js";
import makeCreateNote from "./create-note.use-case.js";
import makeFindNotes from "./find-notes.use-case.js";
import validations from "../../services/validations/index.validation.js";

const findNotes = makeFindNotes({ notesDb });
const createNote = makeCreateNote(notesDb, validations.noteValidation);

const notesUseCase = Object.freeze({
  findNotes,
  createNote,
});

export default notesUseCase;
export { createNote, findNotes };
