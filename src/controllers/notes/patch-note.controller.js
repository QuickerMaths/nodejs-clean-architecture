import { MissingPropertyError } from "../../utils/errors/index.errors.js";

export default function makePatchNote({ updateNote }) {
  return async function patchNote(httpRequest) {
    if (!httpRequest.params.id) {
      throw new MissingPropertyError(
        "Missing Property Error",
        400,
        "Property id is missing.",
        true
      );
    }

    const updatedNote = await updateNote({
      id: httpRequest.params.id,
      ...httpRequest.body,
    });

    return {
      statusCode: 200,
      body: { updatedNote },
    };
  };
}
