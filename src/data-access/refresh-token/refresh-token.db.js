export default function makeRefreshTokenDb(model) {
  async function insert({ token, id }) {
    const refreshToken = await model.create({ token, user: id });

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
