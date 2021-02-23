//imports and initializations
const express = require("express");
const db = require("./db/models");
const passport = require("passport");
const cors = require("cors");
//const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const thingRoutes = require("./routes/thingRoutes");
const userRoutes = require("./routes/userRoutes");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

app.use(bodyParser.json());
app.use(cors());
app.use("/", thingRoutes);
app.use(userRoutes);

app.use((req, res, next) => {
  next({ status: 404, message: "path not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: { message: err.message } });
});

db.sequelize.sync();

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
