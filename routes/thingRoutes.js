const express = require("express");
const router = express.Router();
const {
  thingList,
  newThing,
  removeThing,
  fetchThing,
  thingDetail,
} = require("../controllers/thingControllers");

router.param("thingId", async (req, res, next, thingId) => {
  const thing = await fetchThing(thingId, next);
  if (thing) {
    req.whatever = thing;
    next();
  } else {
    next({ message: "thing does not exist", status: 404 });
  }
});
router.get("/", thingList);
router.post("/", newThing);
router.delete("/:thingId", removeThing);

module.exports = router;
