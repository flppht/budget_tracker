const express = require("express");
const router = express.Router();
const { Income } = require("../models");
const { Op } = require("sequelize");
const { validateToken } = require("../middleware/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  let listOfIncome;
  const username = req.user.username;
  const { month, year } = req.query;

  if (month && year) {
    let startDate = new Date(year, month, 1, 0, 0, 0);
    let endDate = new Date(year, month + 1, 0, 23, 59, 59);

    listOfIncome = await Income.findAll({
      where: {
        createdAt: { [Op.between]: [startDate, endDate] },
        username: username,
      },
    });
  } else if (!month && year) {
    let startDate = new Date(year, 0, 1, 0, 0, 0);
    let endDate = new Date(year, 12, 0, 23, 59, 59);

    listOfIncome = await Income.findAll({
      where: {
        createdAt: { [Op.between]: [startDate, endDate] },
        username: username,
      },
    });
  } else {
    listOfIncome = await Income.findAll({ where: { username: username } });
  }
  res.json(listOfIncome);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const income = await Income.findByPk(id);

  res.json(income);
});

router.post("/", validateToken, async (req, res) => {
  const income = req.body;
  income.username = req.user.username;
  income.type = "income";
  await Income.create(income);

  res.json(income);
});

router.delete("/:incomeId", async (req, res) => {
  const incomeId = req.params.incomeId;

  await Income.destroy({ where: { id: incomeId } });

  res.json("income deleted");
});

router.put("/:incomeId", validateToken, async (req, res) => {
  const incomeId = req.params.incomeId;
  const income = req.body;
  income.username = req.user.username;
  console.log(income);

  await Income.update(income, { where: { id: incomeId } });

  res.json("income updated");
});

module.exports = router;
