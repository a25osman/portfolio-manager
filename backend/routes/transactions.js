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

  // POST /api/transactions/:username/:asset_id
  router.post("/:asset_id", (req, res) => {
    const id = req.params.asset_id
    const qty = req.body.qty;
    const exchange_symbol = req.body.exchange_symbol;
    const exchange_value = req.body.exchange_value;
    const date = req.body.date;

    db.query(`
    INSERT INTO transactions (asset_id, quantity, exchange_symbol, exchange_value, date_transaction)
    VALUES($1, $2, $3, $4, $5);
    `, [id, qty, exchange_symbol, exchange_value, date])
      
  });

  // POST /api/transactions/:transaction_id/delete
  router.post("/:transaction_id/delete", (req, res) => {
    db.query(`
    DELETE FROM transactions
    WHERE id = $1
    ;`, [req.params.transaction_id])
  });

  return router;
};