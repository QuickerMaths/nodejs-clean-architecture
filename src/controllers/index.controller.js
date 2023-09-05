import makeGetNotes from "./get-notes.controller.js";
import makePostNote from "./post-note.controller.js";
import notesUseCase from "../use-cases/index.use-case.js";

const getNotes = makeGetNotes(notesUseCase.findNotes);
const postNote = makePostNote(notesUseCase.createNote);

const notesController = Object.freeze({
  getNotes,
  postNote,
});

export default notesController;
export { postNote, getNotes };
