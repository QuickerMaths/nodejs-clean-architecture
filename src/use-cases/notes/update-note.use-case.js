export default function makeUpdateNote({ notesDb, validate }) {
  return async function updateNote({ id, ...changes } = {}) {
    await validate({ ...changes });

    const updatedNote = await notesDb.update({ id, ...changes });

    return updatedNote;
  };
}
