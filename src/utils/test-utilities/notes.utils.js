import mongoose from "mongoose";

const noteId = new mongoose.Types.ObjectId().toString();
const userId = new mongoose.Types.ObjectId().toString();

const noteResponse = {
  id: noteId,
  title: "title with 10 characters 1",
  content: "content with 10 characters 1",
  important: false,
  userId: userId,
  createdAt: "2021-01-01T00:00:00.000Z",
  updatedAt: "2021-01-01T00:00:00.000Z"
};

const noteResponseArray = [
  {
    id: noteId,
    title: "title with 10 characters 1",
    content: "content with 10 characters 1",
    important: false,
    userId: userId,
    createdAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2021-01-01T00:00:00.000Z"
  },
  {
    id: noteId,
    title: "title with 10 characters 2",
    content: "content with 10 characters 2",
    important: false,
    userId: userId,
    createdAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2021-01-01T00:00:00.000Z"
  },
  {
    id: noteId,
    title: "title with 10 characters 3",
    content: "content with 10 characters 3",
    important: false,
    userId: userId,
    createdAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2021-01-01T00:00:00.000Z"
  }
];

const createNoteRequest = {
  title: "title with 10 characters 1",
  content: "content with 10 characters 1",
  important: false,
  userId: userId
};

const updateNoteResponse = {
  title: "title updated with 10 characters 1",
  content: "content updated with 10 characters 1",
  important: true,
  userId: userId
};

const updateNoteRequest = {
  title: "title updated with 10 characters 1",
  content: "content updated with 10 characters 1",
  important: true
};

const updateNoteRequestWithInvalidTitle = {
  title: "title",
  content: "content with 10 characters 1",
  important: true
};

const notesUtilities = Object.freeze({
  noteId,
  userId,
  noteResponse,
  noteResponseArray,
  createNoteRequest,
  updateNoteResponse,
  updateNoteRequest,
  updateNoteRequestWithInvalidTitle
});

export default notesUtilities;
