export default function makeCreateNote({ notesDb }) {
  return async function createNote({ title, content } = {}) {
    if (!title) {
      throw new Error("Note must have a title.");
    }

    if (!content) {
      throw new Error("Note must have content.");
    }

    try {
      const note = await notesDb.insert({
        title,
        content,
      });

      return note;
    } catch (err) {
      console.log(err);
    }
  };
}
