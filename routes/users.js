const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

// auth middleware
const { auth } = require("../middleware/auth");

//controller
const {
  addUserController,
  getUsersController,
  getUserController,
  loginController,
  logOutController
} = require("../controllers/userController");

router.get("/", getUsersController);

router.post(
  "/",
  [
    check("firstName", "FirstName is Required").notEmpty(),
    check("lastName", "LastName is Required").notEmpty(),
    check("email", "Email is Required").notEmpty(),
    check("email", "Email Must be valid").isEmail(),
    check("password", "Password is Required").notEmpty(),
    check("password", "Password Must be 6 characters long").isLength({
      min: 6,
    }),
    check("confirmPassword", "confirmPassword is Required").notEmpty(),
    check("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password don't match");
      } else {
        return true;
      }
    }),
  ],
  addUserController
);

// Login User
router.post("/login", loginController);

// Logout User 
router.post('/logout', auth, logOutController)


// Getting single User
router.get("/me", auth, getUserController);
module.exports = router;
