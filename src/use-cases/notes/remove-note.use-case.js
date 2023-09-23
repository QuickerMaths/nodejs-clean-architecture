export default function makeRemoveNote({ notesDb }) {
  return async function removeNote({ id }) {
    const content = await notesDb.remove({ id });

    return content;
  };
}
