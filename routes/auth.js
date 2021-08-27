//Route auth users
const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/authController");

//create users
//api/auth
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Min 6 characters").isLength({ min: 6 }),
  ],
  authController.authUser
);
module.exports = router;
