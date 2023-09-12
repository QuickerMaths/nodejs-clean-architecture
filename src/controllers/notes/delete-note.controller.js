import { MissingPropertyError } from "../../utils/errors/index.errors.js";

export default function makeDeleteNote({ removeNote }) {
  return async function deleteNote(httpRequest) {
    if (!httpRequest.params.id) {
      throw new MissingPropertyError(
        "Missing Property Error",
        400,
        "Property id is missing.",
        true
      );
    }

    const content = await removeNote({ id: httpRequest.params.id });

    return {
      statusCode: 204,
      body: content,
    };
  };
}
