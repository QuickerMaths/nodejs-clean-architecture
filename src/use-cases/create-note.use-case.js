export default function makeCreateNote({ notesDb }) {
  return async function createNote({ title, content } = {}) {
    if (!title) {
      throw new Error("Note must have a title.");
    }

    if (!content) {
      throw new Error("Note must have content.");
    }

    return await notesDb.insert({
      title,
      content,
    });
  };
}
