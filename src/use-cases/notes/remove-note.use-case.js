import { NotFoundError } from "../../utils/errors/index.errors.js";

export default function makeRemoveNote({ notesDb }) {
  return async function removeNote({ id }) {
    const content = await notesDb.remove({ id });

    if (!content) throw new NotFoundError("Note not found.");

    return content;
  };
}
