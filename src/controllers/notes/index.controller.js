import makeGetNotes from "./get-notes.controller.js";
import makePostNote from "./post-note.controller.js";
import makeDeleteNote from "./delete-note.controller.js";
import notesUseCase from "../../use-cases/notes/index.use-case.js";

const getNotes = makeGetNotes({ findNotes: notesUseCase.findNotes });
const postNote = makePostNote({ addNote: notesUseCase.createNote });
const deleteNote = makeDeleteNote({ removeNote: notesUseCase.deleteNote });

const notesController = Object.freeze({
  getNotes,
  postNote,
  deleteNote,
});

export default notesController;
export { postNote, getNotes };
