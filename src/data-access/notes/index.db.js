import makeNotesDb from "./notes.db.js";
import Note from "../../models/notes.model.js";

const notesDb = makeNotesDb({ model: Note });

export default notesDb;
