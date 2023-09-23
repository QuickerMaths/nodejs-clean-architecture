export default function makeFindNotes({ notesDb }) {
  return async function findNotes({ userId }) {
    return await notesDb.findAllByUserId({ userId });
  };
}
