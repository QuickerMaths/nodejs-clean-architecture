/**
 * The function `makeGetNotes` is an asynchronous function that retrieves notes for a specific user and
 * returns them in the response body.
 *
 * @returns The function `makeGetNotes` is being returned.
 */

export default function makeGetNotes({ findNotes }) {
  return async function getNotes(httpRequest) {
    const notes = await findNotes({ userId: httpRequest.user.id });

    return {
      statusCode: 200,
      body: notes
    };
  };
}
