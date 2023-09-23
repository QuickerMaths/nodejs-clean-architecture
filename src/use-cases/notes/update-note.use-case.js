export default function makeUpdateNote({ notesDb, validate }) {
  return async function updateNote({ id, toUpdate } = {}) {
    await validate({ ...toUpdate });

    const updatedNote = await notesDb.update({ id, toUpdate });

    return updatedNote;
  };
}
