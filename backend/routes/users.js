const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

module.exports = (db) => {
  // POST /api/users/authenticate
  router.post("/authenticate", (req, res) => {
    const user = req.cookies.username
      ? { username: req.cookies.username }
      : null;
    res.json(user);
  });

  // POST /api/users/login
  router.post("/login", (req, res) => {
    // const realUsername = "bossman";
    // const realPassword = "password";
    const username = req.body.username;
    const password = req.body.password;

    // if (password === realPassword && username === realUsername) {
    //   res.cookie("username", username);
    //   res.json({ username });
    // } else {
    //   res.status(401).send("Incorrect Username and/or Password");
    // }

    db.query(
      `
    SELECT * FROM users
    WHERE users.username = $1;
    `,
      [username]
    )
      .then((data) => {
        if (bcrypt.compareSync(password, data.rows[0].hashed_password)) {
          res.cookie("username", username);
          res.json({ username });
        } else {
          res.status(401).json("Incorrect Username and/or Password!");
        }
      })
      .catch((err) => {
        res.status(401).send("Username does not exist!");
      });
  });

  // POST /api/users/logout
  router.post("/logout", (req, res) => {
    res.clearCookie("username", { domain: "localhost", path: "/" });
    res.json("Logged out");
    // return res.status(200).redirect("/login");
  });

  return router;
};
