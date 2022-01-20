const express = require("express");
const router = express.Router();
const axios = require('axios');

module.exports = (db) => {
  // GET /api/portfolio/coins
  router.get("/coins", (req, res) => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=CAD&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then(response => {
        const coin_ids = [];
        for (let obj of response.data) {
          coin_ids.push(obj.id)
        }
        res.json(coin_ids)
      })
      .catch(err => console.log(err));
  });

  // GET /api/portfolio/:username
  router.get("/:username", async (req, res) => {
    const results = []; // [{"bitcoin": {date1: [price, qty]}}, ...]
    const coin_list = {};
    db.query(`
    SELECT assets.coin_name, assets.coin_symbol, transactions.*, to_char(transactions.date_transaction,'DD-MM-YYYY') As formattedDate
    FROM users
    JOIN assets ON assets.user_id = users.id
    JOIN transactions ON transactions.asset_id = assets.id 
    WHERE users.username = $1;
    `, [req.params.username])
      .then(async (data) => {
        // res.json(data.rows)
        
        for (let i in data.rows) {
          const coin = data.rows[i].coin_name
          const qty = data.rows[i].quantity

          const date1 = data.rows[i].formatteddate; // dd-mm-yr
          const date2 = date1.slice(3,6) + date1.slice(0,3) + date1.slice(6) // mm-dd-yr
          const date = new Date(date2); 
          const today = new Date();
          days = Math.ceil(Math.abs(today - date) / (1000 * 60 * 60 * 24))

          try {
            const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}&interval=daily`)
            if (coin_list[coin]) { //duplicate coin added
              for (let array of response.data.prices) {
                const arrayDate = new Date(array[0])
                const listDates = [];
                if (!listDates.includes(arrayDate.toLocaleDateString("en-US"))){
                  if (arrayDate >= date) {
                    results[coin_list[coin]][coin][arrayDate.toLocaleDateString("en-US")][1] += qty
                    listDates.push(arrayDate.toLocaleDateString("en-US"))
                  }
                }
              }
            } else { // unique coin added
              coin_list[coin] = i
              const data = {};
              data[coin] = {};
              for (let array of response.data.prices) {
                const arrayDate = new Date(array[0]).toLocaleDateString("en-US")
                const arrayPrice = array[1]
                data[coin][arrayDate] = [arrayPrice, qty]
              }
              results.push(data)
            }
          } catch (err) {
            console.log(err)
          }
        }
        res.json(results)
      })
      .catch(err => console.log(err));
  });

  return router;
};
