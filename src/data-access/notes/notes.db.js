export default function makeNotesDb({ model }) {
  async function findAllByUserId({ userId }) {
    const notes = await model.find({ userId });

    return notes;
  }

  async function insert({ ...noteData }) {
    const note = await model.create({ ...noteData });

    return note;
  }

  async function remove({ id }) {
    const note = await model.findByIdAndDelete(id);

    return note;
  }

  async function update({ id, ...noteData }) {
    const note = await model.findByIdAndUpdate(id, { ...noteData });

    return note;
  }

  return Object.freeze({
    findAllByUserId,
    insert,
    remove,
    update,
  });
}
