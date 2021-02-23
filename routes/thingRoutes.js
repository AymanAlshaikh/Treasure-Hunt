const {
  thingList,
  newThing,
  removeThing,
  fetchThing,
} = require("../controllers/thingControllers");

const express = require("express");
const router = express.Router();

router.param("thingID", async (req, res, next, thingId) => {
  const thing = fetchThing(thingId, next);
  if (thing) {
    req.whatever = thing;
    next();
  } else {
    next({ message: "thing does not exist", status: 404 });
  }
});
router.get("/", thingList);
router.post("/", newThing);
router.delete("/thingId", removeThing);

module.exports = router;
