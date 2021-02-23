const { Thing } = require("../db/models/Thing");

exports.thingList = async (req, res, next) => {
  try {
    const things = await Thing.findAll();
    res.json(things);
  } catch (error) {
    next(error);
  }
};

exports.fetchThing = async (next, thingId) => {
  try {
    return (found = await Thing.findByPk(thingId));
  } catch (error) {
    next(error);
  }
};

exports.newThing = async (req, res, next) => {
  try {
    const newThing = await Thing.create(req.body);
    res.json(newThing);
    res.status(201);
  } catch (error) {
    next(error);
  }
};

exports.removeThing = async (req, res, next) => {
  try {
    await req.whatever.destroy();
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
};
