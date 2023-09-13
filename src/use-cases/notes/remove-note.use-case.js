/**
 * The function `makeRemoveNote` returns an asynchronous function that removes a note from a database.
 *
 * @returns The function `makeRemoveNote` is returning an asynchronous function `removeNote`.
 */

export default function makeRemoveNote({ notesDb }) {
  return async function removeNote({ id }) {
    const content = await notesDb.remove({ id });

    return content;
  };
}
