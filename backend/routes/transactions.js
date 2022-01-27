const express = require("express");
const router = express.Router();

module.exports = (db) => {

	// GET /api/transactions/:username/:asset_id
  router.get("/:username/:asset_id", (req, res) => {
    db.query(`
    SELECT assets.coin_name, assets.coin_symbol, transactions.*, to_char(transactions.date_transaction,'MM/DD/YYYY') As date
    FROM users
    JOIN assets ON assets.user_id = users.id
    JOIN transactions ON transactions.asset_id = assets.id 
    WHERE users.username = $1 AND assets.id = $2;
    `, [req.params.username, req.params.asset_id])
      .then(data => {
        res.json(data.rows)
      })
      .catch (err => console.log(err));
  });
// GET /api/transactions/:username get all the transactions for a specific user 
  router.get("/:username", (req, res) => {
    db.query(`
    SELECT assets.coin_name, assets.coin_symbol, transactions.*, to_char(transactions.date_transaction,'MM/DD/YYYY') As date
    FROM users
    JOIN assets ON assets.user_id = users.id
    JOIN transactions ON transactions.asset_id = assets.id 
    WHERE users.username = $1
    ORDER BY transactions.id DESC;
    `, [req.params.username])
      .then(data => {
        res.json(data.rows)
      })
      .catch (err => console.log(err));
  });

  // POST /api/transactions/:username/:coin
  router.post("/:username/:coin", (req, res) => {
    const user = req.params.username;
    const coin = req.params.coin;
    const qty = Number(req.body.qty);
    const exchange_symbol = req.body.exchange_symbol;
    const exchange_value = req.body.exchange_value;
    const date = req.body.date;

    console.log("req body---",req.body, "req params--", req.params)
    console.log("backend console log---", user, coin, qty, exchange_symbol, exchange_value, date, typeof user, typeof coin, typeof qty, typeof exchange_symbol, typeof exchange_value, typeof date)

    db.query(`
    SELECT assets.id
    FROM users
    JOIN assets ON assets.user_id = users.id
    WHERE users.username = $1 AND assets.coin_name = $2;
    `, [user, coin])
      .then(data => {
        console.log("----------->\n\n\n", data.rows)
        const asset_id = data.rows[0].id;
        db.query(`
        INSERT INTO transactions (asset_id, quantity, exchange_symbol, exchange_value, date_transaction)
        VALUES($1, $2, $3, $4, $5);
        `, [asset_id, qty, exchange_symbol, exchange_value, date])
        })
      .catch (err => console.log(err));
      
  });

  // POST /api/transactions/remove/:transaction_id/delete
  router.post("/remove/:transaction_id/delete", (req, res) => {
    db.query(`
    DELETE FROM transactions
    WHERE id = $1
    ;`, [req.params.transaction_id])
  });

  return router;
};