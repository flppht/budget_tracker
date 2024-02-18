module.exports = (sequelize, DataTypes) => {
  const Incomes = sequelize.define("Incomes", {
    incomeTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    incomeValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    incomeLocation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Incomes;
};
