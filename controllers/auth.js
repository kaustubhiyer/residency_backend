const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

exports.profile = (req, res, next) => {};

exports.signup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const err = new Error("Invalid details");
  //   err.status = 422;
  //   err.data = errors.array();
  //   throw err;
  // }
  try {
    const hashedpw = await bcrypt.hash(password, 12);
    let user = new User({
      email,
      password: hashedpw,
      first_name,
      last_name,
      posts: [],
      organization: "123893238293",
    });
    let result = await user.save();
    return res.status(201).json({
      message: "User created",
      userId: result._id,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      const err = new Error("Email or password incorrect");
      err.status = 401;
      throw err;
    }
    let equal = await bcrypt.compare(password, user.password);
    if (!equal) {
      const err = new Error("Email or password incorrect");
      err.status = 401;
      throw err;
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.status(200).json({
      token,
      userId: user._id.toString(),
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next(err);
  }
};

exports.updateUser = (req, res, next) => {};
