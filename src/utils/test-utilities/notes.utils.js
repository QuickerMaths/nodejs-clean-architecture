import mongoose from "mongoose";

const noteId = new mongoose.Types.ObjectId().toString();
const userId = new mongoose.Types.ObjectId().toString();

const noteResponse = {
  id: noteId,
  title: "title",
  content: "content",
  important: false,
  userId: userId,
  createdAt: "2021-01-01T00:00:00.000Z",
  updatedAt: "2021-01-01T00:00:00.000Z"
};

const noteResponseArray = [
  {
    id: noteId,
    title: "title1",
    content: "content1",
    important: false,
    userId: userId,
    createdAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2021-01-01T00:00:00.000Z"
  },
  {
    id: noteId,
    title: "title2",
    content: "content2",
    important: false,
    userId: userId,
    createdAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2021-01-01T00:00:00.000Z"
  },
  {
    id: noteId,
    title: "title3",
    content: "content3",
    important: false,
    userId: userId,
    createdAt: "2021-01-01T00:00:00.000Z",
    updatedAt: "2021-01-01T00:00:00.000Z"
  }
];

const notesUtilities = Object.freeze({
  noteResponse,
  noteResponseArray
});

export default notesUtilities;
