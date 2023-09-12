export default function makeNotesDb(model) {
  async function findAllByUserId({ userId }) {
    const notes = await model.find({ userId });

    return notes;
  }

  async function insert({ ...noteData }) {
    const note = await model.create({ ...noteData });

    return note;
  }

  return Object.freeze({
    findAllByUserId,
    insert,
  });
}
