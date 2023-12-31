import makeGetNotes from "./get-notes.controller.js";
import makePostNote from "./post-note.controller.js";
import makeDeleteNote from "./delete-note.controller.js";
import makePatchNote from "./patch-note.controller.js";
import notesUseCase from "../../use-cases/notes/index.use-case.js";

const getNotes = makeGetNotes({ findNotes: notesUseCase.findNotes });
const postNote = makePostNote({ addNote: notesUseCase.createNote });
const deleteNote = makeDeleteNote({ removeNote: notesUseCase.removeNote });
const patchNote = makePatchNote({ updateNote: notesUseCase.updateNote });

const notesController = Object.freeze({
  getNotes,
  postNote,
  deleteNote,
  patchNote,
});

export default notesController;
