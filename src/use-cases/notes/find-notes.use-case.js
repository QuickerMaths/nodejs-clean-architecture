export default function makeFindNotes({ notesDb }) {
  return async function findNotes() {
    return await notesDb.findAll();
  };
}
