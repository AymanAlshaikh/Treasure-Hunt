const express = require("express");
const router = express.Router();
const passport = require("passport");
const { signUp, signIn } = require("../controllers/userControllers");

router.post("/signup", signUp);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signIn
);

module.exports = router;
