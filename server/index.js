const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const db = require("./models");

app.use(express.json());
app.use(cors());

//routers
const outcomesRouter = require("./routes/Outcomes");
app.use("/outcomes", outcomesRouter);

const incomesRouter = require("./routes/Incomes");
app.use("/incomes", incomesRouter);

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server is listening on port: ", process.env.PORT);
  });
});
