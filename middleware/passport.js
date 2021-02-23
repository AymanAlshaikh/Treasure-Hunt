const { User } = require("../db/models/");
const JWTStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../controllers/config/keys");

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

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false);
    }
    try {
      const user = await User.findByPk(jwtPayload.id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);

// exports.jwtStrategy = new JWTStrategy(
//   { jwtFromRequest: fromAuthHeaderAsBearerToken(), secretOrKey: JWT_SECRET },
//   async (jwtPayload, done) => {
//     if (jwtPayload.exp < Date.now()) {
//       return done(null, false);
//     }
//     try {
//       const user = await User.findByPk(jwtPayload.id);
//       console.log(user);
//       return done(null, user);
//     } catch (error) {
//       done(error);
//     }
//   }
// );
