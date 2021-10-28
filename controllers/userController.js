const { validationResult } = require("express-validator");

//models

const User = require("../models/user");

module.exports.addUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array());
  }
  const user = new User(req.body);
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) return res.status(400).send("User Already Registered");
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.getUsersController = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports.getUserController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array());
  }
  const id = req.params.id;
  try {
    const user = await User.findById(id, "-password");
    if (!user) return res.status(404).send("user not exist");
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
