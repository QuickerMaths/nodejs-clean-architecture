export default function makeRefreshTokenDb(model) {
  async function insert({ token, id }) {
    const refreshToken = await model.create({ token, userId: id });

    return refreshToken;
  }

  async function remove({ id }) {
    await model.findByIdAndDelete(id);

    return {};
  }

  async function findByProperty({ user }) {
    const refreshToken = await model.findOne({ user });

    return refreshToken;
  }

  return Object.freeze({
    insert,
    remove,
    findByProperty,
  });
}
