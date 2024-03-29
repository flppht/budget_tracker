const config = {
  //for using docker, hostname should be postgres as it's a service
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "budgettracker_dev",
    host: "postgres",
    dialect: "postgres",
  },

  //on local using mysql
  // development: {
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   database: "budgettracker",
  //   host: "127.0.0.1",
  //   dialect: "mysql",
  // },
  test: {
    username: "postgres",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USERNAME_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_DATABASE_PROD,
    host: process.env.DB_HOST_PROD,
    dialect: "postgres",
  },
};

module.exports = config;
