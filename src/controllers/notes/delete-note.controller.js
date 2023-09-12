export default function makeDeleteRemoveNote({ removeNote }) {
  return async function deleteRemoveNote(httpRequest) {
    const content = await removeNote({ id: httpRequest.user.id });

    return {
      statusCode: 204,
      body: content,
    };
  };
}
