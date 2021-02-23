const bcrypt = require("bcrypt");
const { User } = require("../db/models/");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("./config/keys");

exports.signUp = async (req, res, next) => {
  const { password } = req.body;
  try {
    const hashedPassowrd = await bcrypt.hash(password, 10);
    req.body.password = hashedPassowrd;
    const newUser = await User.create(req.body);

    const payload = {
      id: newUser.id,
      username: newUser.username,
      exp: Date.now() + JWT_EXPIRATION_MS,
    };
    const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signIn = async (req, res, next) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    // password: user.password,
    // email: user.email,
    exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
  };
  const token = jwt.sign(JSON.stringify(payload), JWT_SECRET);
  res.json({ token });
};
