const express = require("express");
const app = express();

// Middleware
app.use(express.json());

let notes = [
  {
    id: 1,
    title: "Note title 1",
    description: "Node Description",
  },
  {
    id: 2,
    title: "Note title 2",
    description: "Node Description",
  },
];

app.get("/", (req, res) => {
  res.send("Welcome to Notes App. Here You Can Manage Your Note");
});

// Get Notes
app.get("/notes", (req, res) => {
  if (notes.length == 0) {
    return res.send("No Notes Found or Yet Created");
  }
  res.send(notes);
});

// Get Single Note
app.get("/notes/:noteId", (req, res) => {
  const noteId = parseInt(req.params.noteId);
  const note = notes.find((note) => note.id === noteId);
  if (note) return res.send(note);
  res.status(404).send("Note Not Found");
});

// Adding Note
app.post("/notes", (req, res) => {
  const note = req.body;
  notes = [...notes, note];
  res.send(notes);
});

// const gotNoteInput = ['id','title', 'description']

// Update Note
app.put("/notes/:noteId", (req, res) => {
  const noteId = parseInt(req.params.noteId);
  const noteInput = req.body;
  const gotNoteInput = Object.keys(noteInput);
  const allowUpdates = ["title", "description"];
  try {
    const isAllowed = gotNoteInput.every((update) =>
      allowUpdates.includes(update)
    );
    if (!isAllowed) {
      return res.status(400).send("Invalid operation");
    }
    const note = notes.find((note) => note.id === noteId);
    if (note) {
      // Success update
      notes = notes.map((note) => {
        if (note.id === noteId) {
          return {
            ...note,
            ...noteInput,
          };
        } else {
          return note;
        }
      });
    } else {
      // Dell with Note That Not Found
      return res.status(404).send("Note Not Found");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }

  // Server error
});

// Delete Note
app.delete()

// Not Found
app.get("*", (req, res) => {
  res.status(404).send("404 Not found");
});

//server creation
app.listen(3000, () => {
  console.log("server is created and listening on port 3000");
});
