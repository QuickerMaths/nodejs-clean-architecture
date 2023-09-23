import { MissingPropertyError } from "../../utils/errors/index.errors.js";

/**
 * The function `makePatchNote` is an async function that takes an `updateNote` function as a parameter
 * and returns a function `patchNote` that handles patching a note with the given `id` and `toUpdate`
 * data.
 *
 * @returns The function `makePatchNote` returns another function `patchNote`.
 */

export default function makePatchNote({ updateNote }) {
  return async function patchNote(httpRequest) {
    if (!httpRequest.params.id) {
      throw new MissingPropertyError("Property id is missing.");
    }

    const toUpdate = httpRequest.body;

    const updatedNote = await updateNote({
      id: httpRequest.params.id,
      toUpdate
    });

    return {
      statusCode: 200,
      body: { updatedNote }
    };
  };
}
