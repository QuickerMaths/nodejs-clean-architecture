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
