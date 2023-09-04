export default function makeNotesDb(model) {
  async function findAll() {
    const notes = await model.find();

    return notes;
  }

  async function insert({ title, content, important }) {
    const note = await model.create({ title, content, important });

    return note;
  }

  return Object.freeze({
    findAll,
    insert,
  });
}
