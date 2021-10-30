const express = require("express");
const mongoose = require("mongoose");
const { check } = require("express-validator");
const cookieParser = require("cookie-parser");
const app = express();

//DB
const { connectDB } = require("./db/dbConnection");

// Routes
const notesRoute = require("./routes/notes");
const usersRoute = require("./routes/users");
const indexRoute = require("./routes");



// Middleware
app.use(express.json());
app.use(cookieParser ('SecretKey'));
// app.use(auth):

// Connecting DB
connectDB();

//Handling Route
app.use("/notes", notesRoute);
app.use("/users", usersRoute);
app.use("/", indexRoute);

//server creation
app.listen(3000, () => {
  console.log("server is created and listening on port 3000");
});
