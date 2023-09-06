export default function makeNotesDb(model) {
  async function findAll() {
    const notes = await model.find();

    return notes;
  }

  async function insert({ ...noteData }) {
    const note = await model.create({ ...noteData });

    return note;
  }

  return Object.freeze({
    findAll,
    insert,
  });
}
