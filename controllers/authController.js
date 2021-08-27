const User = require("../models/Users");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    //user registered?
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Username does not exist" });
    }
    //compare passwords
    const passCorrect = await bcryptjs.compare(password, user.password);
    if (!passCorrect) {
      return res.status(400).json({ msg: "Incorrect password" });
    }
    //if everything is fine
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
  } catch (error) {
    console.log(error);
  }
};
