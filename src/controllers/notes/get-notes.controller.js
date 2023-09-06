export default function makeGetNotes(findNotes) {
  return async function getNotes() {
    const notes = await findNotes();

    return {
      statusCode: 200,
      body: {
        notes,
      },
    };
  };
}
