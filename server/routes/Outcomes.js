const express = require("express");
const router = express.Router();
const { Outcomes } = require("../models");
const { Op } = require("sequelize");
const { validateToken } = require("../middleware/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  let listOfOutcomes;
  const username = req.user.username;
  const { month, year } = req.query;

  if (month && year) {
    let startDate = new Date(year, month, 1, 0, 0, 0);
    let endDate = new Date(year, month + 1, 0, 23, 59, 59);

    listOfOutcomes = await Outcomes.findAll({
      where: {
        createdAt: { [Op.between]: [startDate, endDate] },
        username: username,
      },
    });
  } else if (!month && year) {
    let startDate = new Date(year, 0, 1, 0, 0, 0);
    let endDate = new Date(year, 12, 0, 23, 59, 59);

    listOfOutcomes = await Outcomes.findAll({
      where: {
        createdAt: { [Op.between]: [startDate, endDate] },
        username: username,
      },
    });
  } else {
    listOfOutcomes = await Outcomes.findAll({ where: { username: username } });
  }

  res.json(listOfOutcomes);
});

router.get("/byId/:id", validateToken, async (req, res) => {
  const id = req.params.id;
  const username = req.user.username;
  const outcome = await Outcomes.findByPk(id);

  res.json(outcome);
});

router.post("/", validateToken, async (req, res) => {
  const outcome = req.body;
  const username = req.user.username;
  outcome.username = username;
  await Outcomes.create(outcome);

  res.json(outcome);
});

module.exports = router;
