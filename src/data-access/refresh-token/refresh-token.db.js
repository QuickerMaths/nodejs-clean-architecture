export default function makeRefreshTokenDb(model) {
  async function insert({ token, id }) {
    const refreshToken = await model.create({ token, userId: id });

    return refreshToken;
  }

  async function remove({ id }) {
    await model.findByIdAndDelete(id);

    return {};
  }

  async function findById({ id }) {
    const refreshToken = await model.findById(id);

    return refreshToken;
  }

  return Object.freeze({
    insert,
    remove,
    findById,
  });
}
