export default function makePostNote(addComment) {
  return async function postNote(httpRequest) {
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const toAdd = {
        title: httpRequest.body.title,
        content: httpRequest.body.content,
      };

      const note = await addComment(toAdd);

      return {
        headers,
        statusCode: 201,
        body: { note },
      };
    } catch (e) {
      console.log(e);

      return {
        headers,
        statusCode: 400,
        body: {
          error: e.message,
        },
      };
    }
  };
}
