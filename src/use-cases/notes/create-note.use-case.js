/**
 * The function `makeCreateNote` is a factory function that returns an asynchronous function for
 * creating a note with validation and insertion into a database.
 *
 * @returns The function `makeCreateNote` is returning an asynchronous function `createNote`.
 */

export default function makeCreateNote({ notesDb, validate }) {
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
