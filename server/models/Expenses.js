module.exports = (sequelize, DataTypes) => {
  const Expenses = sequelize.define("Expenses", {
    expenseTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expenseValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    expenseLocation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Expenses;
};
