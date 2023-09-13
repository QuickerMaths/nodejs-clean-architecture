/**
 * The function `makeFindNotes` returns an asynchronous function that finds all notes by a given user
 * ID using a notes database.
 *
 * @returns The function `makeFindNotes` is returning an asynchronous function `findNotes` that takes
 * an object parameter `{ userId }`. Inside the `findNotes` function, it is calling the
 * `findAllByUserId` method of the `notesDb` object with the `userId` parameter and returning the
 * result.
 */

export default function makeFindNotes({ notesDb }) {
  return async function findNotes({ userId }) {
    return await notesDb.findAllByUserId({ userId });
  };
}
