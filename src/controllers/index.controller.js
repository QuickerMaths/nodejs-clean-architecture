import makeGetNotes from "./get-notes.controller.js";
import makePostNote from "./post-note.controller.js";
import noteService from "../use-cases/index.use-case.js";

const getNotes = makeGetNotes(noteService.findNotes);
const postNote = makePostNote(noteService.createNote);

const notesController = Object.freeze({
  getNotes,
  postNote,
});

export default notesController;
export { postNote, getNotes };
