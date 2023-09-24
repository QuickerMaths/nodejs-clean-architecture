import { NotFoundError } from "../../utils/errors/index.errors.js";

export default function makeUpdateNote({ notesDb, validate }) {
  return async function updateNote({ id, toUpdate } = {}) {
    await validate({ ...toUpdate });

    const updatedNote = await notesDb.update({ id, toUpdate });

    if (!updatedNote) throw new NotFoundError("Note not found.");

    return updatedNote;
  };
}
