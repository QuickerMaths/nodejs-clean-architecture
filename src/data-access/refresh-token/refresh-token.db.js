/**
 * The function `makeRefreshTokenDb` creates a database object with methods for inserting, removing,
 * and finding refresh tokens.
 *
 * @param model - The `model` parameter that the `makeNotesDb` function takes is a database model
 * object. It is responsible for creating, retrieving, updating, and deleting note data in the
 * database.
 *
 * @returns an object with three methods: `insert`, `remove`, and `findByProperty`.
 */
export default function makeRefreshTokenDb({ model }) {
  async function insert({ token, userId }) {
    const refreshToken = await model.create({ token, userId });

    return refreshToken;
  }

  async function remove({ token }) {
    await model.findOneAndDelete({ token });

    return {};
  }

  async function findByProperty({ property }) {
    const refreshToken = await model.findOne({ property });

    return refreshToken;
  }

  return Object.freeze({
    insert,
    remove,
    findByProperty,
  });
}
