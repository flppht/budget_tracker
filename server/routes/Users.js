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

router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await Users.findOne({ where: { id: req.user.id } });

  bcrypt.compare(oldPassword, user.password).then((match) => {
    if (!match) {
      res.json({ error: "Your old password is not correct!" });
    } else {
      bcrypt.hash(newPassword, 10).then(async (hash) => {
        await Users.update({ password: hash }, { where: { id: user.id } });
      });

      res.json("Password sucessfully updated!");
    }
  });
});

module.exports = router;
