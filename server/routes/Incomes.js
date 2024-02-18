const express = require("express");
const router = express.Router();
const { Incomes } = require("../models");
const { Op } = require("sequelize");
const { validateToken } = require("../middleware/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  let listOfIncomes;
  const username = req.user.username;
  const { month, year } = req.query;

  if (month && year) {
    let startDate = new Date(year, month, 1, 0, 0, 0);
    let endDate = new Date(year, month + 1, 0, 23, 59, 59);

    listOfIncomes = await Incomes.findAll({
      where: {
        createdAt: { [Op.between]: [startDate, endDate] },
        username: username,
      },
    });
  } else if (!month && year) {
    let startDate = new Date(year, 0, 1, 0, 0, 0);
    let endDate = new Date(year, 12, 0, 23, 59, 59);

    listOfIncomes = await Incomes.findAll({
      where: {
        createdAt: { [Op.between]: [startDate, endDate] },
        username: username,
      },
    });
  } else {
    listOfIncomes = await Incomes.findAll({ where: { username: username } });
  }
  res.json(listOfIncomes);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const income = await Incomes.findByPk(id);

  res.json(income);
});

router.post("/", validateToken, async (req, res) => {
  const income = req.body;
  income.username = req.user.username;
  await Incomes.create(income);

  res.json(income);
});

module.exports = router;
