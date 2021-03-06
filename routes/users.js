//Route create users
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { check } = require("express-validator");

//create users
router.post(
  "/",
  [
    check("userName", "User name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Min 6 characters").isLength({ min: 6 }),
  ],
  userController.createUsers
);
module.exports = router;
