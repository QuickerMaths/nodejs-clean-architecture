jest.mock("../../../data-access/notes/index.db.js", () => ({
  findAllByUserId: jest.fn(),
  insert: jest.fn(),
  remove: jest.fn(),
  update: jest.fn()
}));

import notesDbMock from "../../../data-access/notes/index.db.js";

export default notesDbMock;
