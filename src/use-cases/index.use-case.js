import notesDb from "../data-access/index.db.js";
import makeCreateNote from "./create-note.use-case.js";
import makeFindNotes from "./find-notes.use-case.js";

const findNotes = makeFindNotes({ notesDb });
const createNote = makeCreateNote({ notesDb });

const notesService = Object.freeze({
  findNotes,
  createNote,
});

export default notesService;
export { createNote, findNotes };
