/**
 * The function `makePostNote` is an asynchronous function that takes an `addNote` function as a
 * parameter and returns another asynchronous function `postNote` that handles the logic for creating a
 * new note.
 *
 * @returns The function `makePostNote` is returning another function `postNote`.
 */

export default function makePostNote({ addNote }) {
  return async function postNote(httpRequest) {
    const toAdd = {
      title: httpRequest.body.title,
      content: httpRequest.body.content,
      important: httpRequest.body.important,
      userId: httpRequest.user.id,
    };

    const note = await addNote({ ...toAdd });

    return {
      statusCode: 201,
      body: { note },
    };
  };
}
