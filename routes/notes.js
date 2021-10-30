const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
//middleware
const {auth} = require("../middleware/auth");

//controller
const {
  addNoteController,
  getNoteController,
  getNotesController,
  updateNoteController,
  deleteNoteController,
} = require("../controllers/noteController");
// Get Notes
router.get("/", auth, getNotesController);

// Get Single Note
router.get(
  "/:noteId",
  check("noteId", "Note Not Found").isMongoId(),
  getNoteController
);

// Adding Note
router.post(
  "/",
  [
    check("title", "Title is Required").notEmpty(),
    check("description", "Description is Required").notEmpty(),
  ],
  addNoteController
);

// Update Note
router.put(
  "/:noteId",
  [
    check("noteId", "Note Not Found").isMongoId(),
    check("title", "Title is Required").optional().notEmpty(),
    check("description", "Description is Required").optional().notEmpty(),
  ],
  updateNoteController
);

// Delete Note
router.delete(
  "/:noteId",
  check("noteId", "Note Not Found").isMongoId(),
  deleteNoteController
);

module.exports = router;
