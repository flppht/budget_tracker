const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/AuthMiddleware");

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({ username, password: hash });
  });

  res.json("user created");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    res.json({ error: "User does not exist!" });
  } else {
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        res.json({ error: "Wrong username and password combination!" });
      } else {
        const accessToken = sign(
          { username: user.username, id: user.id },
          process.env.JWT_SECRET
        );

        res.json({ accessToken, username, id: user.id });
      }
    });
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
