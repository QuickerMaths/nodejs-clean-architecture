export default function makeCreateNote(notesDb, validate) {
  return async function createNote({ title, content, important } = {}) {
    const note = {
      title,
      content,
      important,
    };

    const errors = validate(note);

    if (errors) {
      throw new Error(errors);
    }

    return await notesDb.insert({
      title,
      content,
      important,
    });
  };
}
