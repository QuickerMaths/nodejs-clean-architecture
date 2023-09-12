export default function makeDeleteNote({ removeNote }) {
  return async function deleteNote(httpRequest) {
    const content = await removeNote({ id: httpRequest.params.id });

    return {
      statusCode: 204,
      body: content,
    };
  };
}
