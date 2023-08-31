export default function makeNotesDb(model) {
  async function findAll() {
    const notes = await model.find();

    return notes;
  }

  async function insert({ title, content }) {
    try {
      const note = await model.create({ title, content });

      return note;
    } catch (e) {
      console.log(e);
    }
  }

  return Object.freeze({
    findAll,
    insert,
  });
}
