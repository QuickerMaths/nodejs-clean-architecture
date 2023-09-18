/**
 * The function `makeUserDb` creates a user database object with methods for inserting, retrieving, and
 * updating user data using a provided model.
 *
 * @param model - The `model` parameter that the `makeNotesDb` function takes is a database model
 * object. It is responsible for creating, retrieving, updating, and deleting note data in the
 * database.
 *
 * @returns The function `makeUserDb` returns an object with four methods: `insert`, `getById`,
 * `getByEmail`, and `update`.
 */

export default function makeUserDb({ model }) {
  async function insert({ ...userData }) {
    const user = model.create({ ...userData });

    return user;
  }

  async function getById({ id }) {
    const user = model.findById(id);

    return user;
  }

  async function getByEmail({ email }) {
    const user = model.findOne({ email });

    return user;
  }

  async function update({ id, ...changes }) {
    const user = await model.findByIdAndUpdate(
      id,
      {
        ...changes,
      },
      {
        returnOriginal: false,
      }
    );

    return user;
  }

  return Object.freeze({
    insert,
    getById,
    getByEmail,
    update,
  });
}
