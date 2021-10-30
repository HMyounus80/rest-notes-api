const bcrypt = require('bcryptjs');
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

// getUserController 
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

// Login User Controller
module.exports.loginController = async(req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).send(errors.array());
  // }
  const {email, password} = req.body;
  try {
     //check user email
  const user = await User.findOne({email});
  if(!user) return res.status(400).send('unable to Login ');
  //check user password
  const isMatched = bcrypt.compare(password, user.password);
  if(!isMatched) return res.status(400).send('password don\'t matched')
  //successfully logged in user
  //generate auth token
    const token = user.generateAuthToken();
    //send as header
    // res.header('x-auth-token', token)
    res.cookie('auth', token, {
      httpOnly: true,
      sameSite: true,
      signed: true,
      maxAge: 4 * 60 * 60 * 1000
    })
  res.send('success')
  } catch (error) {
    res.status(500).send(error)
  }
 
} 
