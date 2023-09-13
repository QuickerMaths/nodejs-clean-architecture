/**
 * The function `makeUpdateNote` returns an asynchronous function that updates a note in a database
 * after validating the input.
 *
 * @returns The function `makeUpdateNote` is returning an asynchronous function `updateNote`.
 */

export default function makeUpdateNote({ notesDb, validate }) {
  return async function updateNote({ id, toUpdate } = {}) {
    await validate({ ...toUpdate });

    const updatedNote = await notesDb.update({ id, toUpdate });

    return updatedNote;
  };
}
