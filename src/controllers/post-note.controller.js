export default function makePostNote(addComment) {
  return async function postNote(httpRequest) {
    const toAdd = {
      title: httpRequest.body.title,
      content: httpRequest.body.content,
      important: httpRequest.body.important,
    };

    const note = await addComment(toAdd);

    return {
      statusCode: 201,
      body: { note },
    };
  };
}
