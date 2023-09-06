export default function makeCreateNote(notesDb, validate) {
  return async function createNote({ title, content, important } = {}) {
    const note = {
      title,
      content,
      important,
    };

    validate(note);

    return await notesDb.insert({
      title,
      content,
      important,
    });
  };
}
