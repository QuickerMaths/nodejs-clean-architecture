/**
 * The function `makeDeleteNote` is an async function that takes an object with a `removeNote` function
 * as a parameter and returns an async function `deleteNote` that deletes a note based on the provided
 * `id` in the `httpRequest` parameter.
 *
 * @returns The function `makeDeleteNote` is returning an asynchronous function `deleteNote`.
 */

export default function makeDeleteNote({ removeNote }) {
  return async function deleteNote(httpRequest) {
    const content = await removeNote({ id: httpRequest.params.id });

    return {
      statusCode: 204,
      body: content
    };
  };
}
