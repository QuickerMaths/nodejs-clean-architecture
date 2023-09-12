export default function makePostNote({ addNote }) {
  return async function postNote(httpRequest) {
    const toAdd = {
      title: httpRequest.body.title,
      content: httpRequest.body.content,
      important: httpRequest.body.important,
      userId: httpRequest.user.id,
    };

    const note = await addNote(toAdd);

    return {
      statusCode: 201,
      body: { note },
    };
  };
}
