import notesDb from "../data-access/index.js";
import makeCreateNote from "./create-note.js";

const createNote = makeCreateNote({ notesDb });

const notesService = Object.freeze({
  createNote,
});

export default notesService;
export { createNote };
