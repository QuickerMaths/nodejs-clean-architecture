import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      minlength: [10, "Title must be at least 10 characters"],
      maxlength: [100, "Title must be at most 100 characters"],
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: String,
      minlength: [10, "Content must be at least 10 characters"],
      maxlength: [1000, "Content must be at most 1000 characters"],
      required: [true, "Content is required"],
      trim: true,
    },
    important: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      required: [true, "User id is required"],
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;
