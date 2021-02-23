const { Thing } = require("../db/models/");

exports.fetchThing = async (thingId, next) => {
  try {
    const found = await Thing.findByPk(thingId);
    return found;
  } catch (error) {
    next(error);
  }
};

exports.thingList = async (req, res, next) => {
  try {
    const things = await Thing.findAll({ where: { treasure: false } });

    res.json(things);
  } catch (error) {
    next(error);
  }
};

exports.treasureList = async (req, res, next) => {
  try {
    const treasures = await Thing.findAll({ where: { treasure: true } });

    res.json(treasures);
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
