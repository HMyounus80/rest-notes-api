const { validationResult } = require("express-validator");
//models
const Note = require("../models/notes");

module.exports.addNoteController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array());
  }
  const note = new Note(req.body);
  try {
    await note.save();
    res.send(note);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports.getNoteController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).send(errors.array());
  }
  try {
    const id = req.params.noteId;
    const note = await Note.findById(id);
    if (!note) return res.status(404).send("No Note Found");
    res.send(note);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.getNotesController = async (req, res) => {
  try {
    const notes = await Note.find();
    res.send(notes);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.updateNoteController = async (req, res) => {
  const id = req.params.noteId;
  const gotNoteInput = Object.keys(req.body);
  const allowUpdates = ["title", "description"];
  const isAllowed = gotNoteInput.every((update) =>
    allowUpdates.includes(update)
  );
  if (!isAllowed) return res.status(400).send("invalid updates");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array());
  }
  try {
    const note = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!note) return res.status(404).send("Not No Found");
    res.send(note);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.deleteNoteController = async (req, res) => {
  const id = req.params.noteId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(404).send(errors.array());

  try {
    const note = await Note.findByIdAndDelete(id);
    if (!note) return res.status(404).send("Note Not Found");
    res.send(note);
  } catch (error) {
    res.status(500).send(error);
  }
};
