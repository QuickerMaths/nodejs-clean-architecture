import makePostNote from "./post-note.controller.js";
import noteService from "../use-cases/index.js";

const postNote = makePostNote(noteService.createNote);

const notesController = Object.freeze({
  postNote,
});

export default notesController;
export { postNote };
