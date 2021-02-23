const express = require("express");
const router = express.Router();
const {
  thingList,
  treasureList,
  newThing,
  removeThing,
  fetchThing,
} = require("../controllers/thingControllers");
const passport = require("passport");

router.param("thingId", async (req, res, next, thingId) => {
  const thing = await fetchThing(thingId, next);
  if (thing) {
    req.whatever = thing;
    next();
  } else {
    next({ message: "thing does not exist", status: 404 });
  }
});
router.get("/things", thingList);
router.get(
  "/treasures",
  passport.authenticate("jwt", { session: false }),
  treasureList
);
router.post("/", newThing);
router.delete("/:thingId", removeThing);

module.exports = router;
