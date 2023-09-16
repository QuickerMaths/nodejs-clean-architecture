/**
 * The `makeNotesDb` function creates a database object with methods for finding, inserting, removing,
 * and updating notes.
 *
 * @param model - The `model` parameter that the `makeNotesDb` function takes is a database model
 * object. It is responsible for creating, retrieving, updating, and deleting note data in the
 * database.
 *
 * @returns The function `makeNotesDb` returns an object with four methods: `findAllByUserId`,
 * `insert`, `remove`, and `update`.
 */

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

  async function update({ id, toUpdate }) {
    const note = await model.findByIdAndUpdate(id, { ...toUpdate });

    return note;
  }

  return Object.freeze({
    findAllByUserId,
    insert,
    remove,
    update,
  });
}
