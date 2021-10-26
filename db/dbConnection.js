const mongoose = require("mongoose");
// Connecting Database
module.exports.connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/notes-app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
