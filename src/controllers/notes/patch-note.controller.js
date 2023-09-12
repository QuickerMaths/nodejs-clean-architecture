export default function makePatchNote({ updateNote }) {
  return async function patchNote(httpRequest) {
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
