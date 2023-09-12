export default function makeGetNotes({ findNotes }) {
  return async function getNotes(httpRequest) {
    const notes = await findNotes({ userId: httpRequest.user.id });

    return {
      statusCode: 200,
      body: {
        notes,
      },
    };
  };
}
