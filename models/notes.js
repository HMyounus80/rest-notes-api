const mongoose = require("mongoose");
const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is Required"],
      minlength: [3, "Title Must be 3 char in Minimum"],
      maxlength: 10,
    },
    description: {
      type: String,
      required: [true, "Description is Required"],
      minlength: 10,
      maxlength: 100,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", notesSchema);
module.exports = Note;
