export default function makeCreateNote(notesDb, validate) {
  return async function createNote({ title, content, important, userId } = {}) {
    const note = {
      title,
      content,
      important,
      userId,
    };

    validate(note);

    return await notesDb.insert({
      title,
      content,
      important,
      userId,
    });
  };
}
