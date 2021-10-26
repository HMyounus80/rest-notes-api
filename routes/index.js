const express = require("express");
const router = express.Router();

// Home Route
router.get("/", (req, res) => {
  res.send("Welcome to Notes App. Here You Can Manage Your Note");
});

// Not Found
router.get("*", (req, res) => {
  res.status(404).send("404 Not found");
});

module.exports = router;
