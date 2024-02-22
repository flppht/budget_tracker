module.exports = (sequelize, DataTypes) => {
  const Income = sequelize.define("Income", {
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

  return Income;
};
