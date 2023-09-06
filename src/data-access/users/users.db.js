export default function makeUserDb(model) {
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

  return Object.freeze({
    insert,
    getById,
    getByEmail,
  });
}
