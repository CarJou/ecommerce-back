//Route create users
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//create users
router.post("/", userController.createUsers);
module.exports = router;
