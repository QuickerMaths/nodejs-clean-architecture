export default function makeCreateNote(notesDb, validate) {
  return async function createNote({ title, content } = {}) {
    const note = {
      title,
      content,
    };

    const errors = validate(note);

    if (errors) {
      throw new Error(errors);
    }

    return await notesDb.insert({
      title,
      content,
    });
  };
}
