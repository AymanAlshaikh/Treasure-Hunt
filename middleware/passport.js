const { User } = require("../db/models/");
const JWTStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    let passwordCheck;
    const user = await User.findOne({ where: { username } });
    if (user) {
      passwordCheck = await bcrypt.compare(password, user.password);
      if (passwordCheck) return done(null, user);
      else return done(null, false);
    } else return done(null, false);
  } catch (error) {
    done(error);
  }
});

//const jwtStrategy = new JWTStrategy(async());
