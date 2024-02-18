module.exports = (sequelize, DataTypes) => {
  const Outcomes = sequelize.define("Outcomes", {
    outcomeTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    outcomeValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    outcomeLocation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Outcomes;
};
