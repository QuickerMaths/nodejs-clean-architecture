import makeNotesDb from "./notes.db.js";
import Note from "../models/notes.model.js";

const notesDb = makeNotesDb(Note);

export default notesDb;
