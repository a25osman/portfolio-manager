const express = require("express");
const router = express.Router();


module.exports = (db) => {

	// POST /api/users/authenticate
  router.post("/authenticate", (req, res) => {
		const user = req.cookies.username ? {username: req.cookies.username} : null;
		res.json(user)
  })

  // POST /api/users/login
  router.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query(`
    SELECT * FROM users
    WHERE users.username = $1;
    `, [username])
    .then((data) => {
      if (bcrypt.compareSync(password, data.rows[0].hashed_password)) {
        res.cookie('username', username);
				res.json({username})
      } else {
        res.status(401).send('Incorrect Username and/or Password!');
      }
    })
    .catch((err) => {
      res.status(401).send('Username does not exist!')
    });
  })

	// POST /api/users/logout
  router.post("/logout", (req, res) => {
		res.clearCookie("username");
  })

  return router;
};
