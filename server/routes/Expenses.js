const express = require("express");
const router = express.Router();
const { Expenses } = require("../models");
const { Op } = require("sequelize");
const { validateToken } = require("../middleware/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  let listOfExpenses;
  const username = req.user.username;
  const { month, year } = req.query;

  if (month && year) {
    let startDate = new Date(year, month, 1, 0, 0, 0);
    let endDate = new Date(year, month + 1, 0, 23, 59, 59);

    listOfExpenses = await Expenses.findAll({
      where: {
        createdAt: { [Op.between]: [startDate, endDate] },
        username: username,
      },
    });
  } else if (!month && year) {
    let startDate = new Date(year, 0, 1, 0, 0, 0);
    let endDate = new Date(year, 12, 0, 23, 59, 59);

    listOfExpenses = await Expenses.findAll({
      where: {
        createdAt: { [Op.between]: [startDate, endDate] },
        username: username,
      },
    });
  } else {
    listOfExpenses = await Expenses.findAll({ where: { username: username } });
  }

  res.json(listOfExpenses);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const expense = await Expenses.findByPk(id);

  res.json(expense);
});

router.post("/", validateToken, async (req, res) => {
  const expense = req.body;
  const username = req.user.username;
  expense.username = username;
  await Expenses.create(expense);

  res.json(expense);
});

router.delete("/:expenseId", async (req, res) => {
  const expenseId = req.params.expenseId;

  await Expenses.destroy({ where: { id: expenseId } });

  res.json("expense deleted");
});

module.exports = router;
