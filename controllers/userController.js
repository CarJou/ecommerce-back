const User = require("../models/Users");
exports.createUsers = async (req, res) => {
  try {
    let user;
    //create user
    user = new User(req.body);
    //save user
    await user.save();
    res.send("Success");
  } catch (error) {
    console.log(error);
    res.status(400).send("Have a error");
  }
};
