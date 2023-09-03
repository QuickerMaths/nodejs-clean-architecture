export default function makeNotesDb(model) {
  async function findAll() {
    const notes = await model.find();

    return notes;
  }

  async function insert({ title, content }) {
    const note = await model.create({ title, content });

    return note;
  }

  return Object.freeze({
    findAll,
    insert,
  });
}
