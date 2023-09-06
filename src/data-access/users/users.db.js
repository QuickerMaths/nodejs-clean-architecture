export default function makeUserDb(model) {
  async function insert({ ...userData }) {
    const user = model.create({ ...userData });

    return user;
  }

  async function getById({ id }) {
    const user = model.findById(id);

    return user;
  }

  return Object.freeze({
    insert,
    getById,
  });
}
