const User = require("../models/Users");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUsers = async (req, res) => {
  //errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    //create user
    user = new User(req.body);

    //hash in password
    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    //save user
    await user.save();

    //createJTW
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 36000,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );

    // res.json({ msg: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send("Have a error");
  }
};
