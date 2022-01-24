const express = require("express");
const router = express.Router();
const axios = require("axios");
const { disabled } = require("../app");

module.exports = (db) => {
  // GET /api/portfolio/coins
  router.get("/coins", (req, res) => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=CAD&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        const coin_ids = [];
        for (let obj of response.data) {
          coin_ids.push(obj.id);
        }
        res.json(coin_ids);
      })
      .catch((err) => console.log(err));
  });

  // POST /api/portfolio/:username
  router.post("/:username", (req, res) => {
    console.log("req-----", req.body);
    db.query(
      `
    SELECT * FROM users
    WHERE users.username = $1;
    `,
      [req.params.username]
    )
      .then((data1) => {
        const id = data1.rows[0].id;
        const coin = req.body.coin;
        const coin_symbol = req.body.coin_symbol;

        db.query(
          `
        INSERT INTO assets (user_id, coin_name, coin_symbol) VALUES($1, $2, $3);
        `,
          [id, coin, coin_symbol]
        );
      })
      .catch((err) => console.log(err));
  });

  // POST /api/portfolio/:username/:asset_id/delete
  router.post("/:username/:asset_id/delete", (req, res) => {
    db.query(
      `
    DELETE FROM assets
    WHERE id = $1
    ;`,
      [req.params.asset_id]
    );
  });

  // GET /api/portfolio/:username
  router.get("/:username", async (req, res) => {
    const results = []; // [{"bitcoin": {date1: [price, qty]}}, ...]
    const coin_list = {};
    let counter = 0;
    db.query(
      `
    SELECT assets.coin_name, assets.coin_symbol, transactions.*, to_char(transactions.date_transaction,'DD-MM-YYYY') As formattedDate
    FROM users
    JOIN assets ON assets.user_id = users.id
    JOIN transactions ON transactions.asset_id = assets.id 
    WHERE users.username = $1;
    `,
      [req.params.username]
    )
      .then(async (data) => {
        // res.json(data.rows)

        for (let i in data.rows) {
          const coin = data.rows[i].coin_name;
          const qty = data.rows[i].quantity;

          const date1 = data.rows[i].formatteddate; // dd-mm-yr
          const date2 = date1.slice(3, 6) + date1.slice(0, 3) + date1.slice(6); // mm-dd-yr
          const date = new Date(date2);
          const today = new Date();
          days = Math.ceil(Math.abs(today - date) / (1000 * 60 * 60 * 24));

          try {
            const response = await axios.get(
              `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}&interval=daily`
            );
            if (coin_list[coin] >= 0) {
              //duplicate coin added
              for (let array of response.data.prices) {
                const arrayDate = new Date(array[0]);
                const listDates = [];
                const dateObj = results[coin_list[coin]][coin];
                const dateArray = Object.keys(dateObj);
                const lastDateEntry = new Date(dateArray[dateArray.length - 1]);
                if (
                  !listDates.includes(arrayDate.toLocaleDateString("en-US")) &&
                  arrayDate <= lastDateEntry
                ) {
                  if (arrayDate >= date) {
                    results[coin_list[coin]][coin][arrayDate.toLocaleDateString("en-US")][1] += qty;
                    let qty1 = results[coin_list[coin]][coin][arrayDate.toLocaleDateString("en-US")][1]
                    let price = results[coin_list[coin]][coin][arrayDate.toLocaleDateString("en-US")][0]
                    results[coin_list[coin]][coin][arrayDate.toLocaleDateString("en-US")][2] = qty1 * price
                    listDates.push(arrayDate.toLocaleDateString("en-US"));
                  } else if (arrayDate < date) {
                    results[coin_list[coin]][coin][
                      arrayDate.toLocaleDateString("en-US")
                    ] = [array[1], qty, array[1] * qty];
                  }
                }
              }
            } else {
              // unique coin added
              coin_list[coin] = counter;
              const data = {};
              data[coin] = {};
              for (let array of response.data.prices) {
                const arrayDate = new Date(array[0]).toLocaleDateString(
                  "en-US"
                );
                const arrayPrice = array[1];
                data[coin][arrayDate] = [arrayPrice, qty, arrayPrice * qty];
              }
              results.push(data);
              counter++;
            }
          } catch (err) {
            console.log(err);
          }
        }
        const today = new Date();
        for (let coin in coin_list) {
          delete results[coin_list[coin]][coin][
            today.toLocaleDateString("en-US")
          ];
        }
        
        res.json(results);
      })
      .catch((err) => console.log(err));
  });

  // GET /api/portfolio/:username/inventory
  router.get("/:username/inventory", (req, res) => {
    const inventory = {};
    const init = {};
    db.query(
      `
    SELECT coin_name, coin_symbol, assets.id AS asset_id
    FROM assets
    JOIN users ON assets.user_id = users.id
    WHERE users.username = $1;
    `,
      [req.params.username]
    ).then((data) => {
      for (let obj of data.rows) {
        inventory[obj.coin_name] = {
          coin_name : obj.coin_name,
          coin_symbol: obj.coin_symbol,
          qty: 0,
          price: null,
          asset_id: obj.asset_id,
        }; //sym, qty, price, id
        init[obj.coin_name] = {
          coin_name : obj.coin_name,
          coin_symbol: obj.coin_symbol,
          qty: 0,
          price: null,
          asset_id: obj.asset_id,
          date: null
        };
      }
      axios
        .get(`http://localhost:3001/api/portfolio/${req.params.username}`)
        .then((info) => {
          for (let obj of info.data) {
            const coin = Object.keys(obj)[0];
            const dates = Object.keys(obj[coin]);

            const lastDate = dates[dates.length - 1];
            const lastqty = obj[coin][lastDate][1];
            const lastprice = obj[coin][lastDate][0];
            inventory[coin].qty = lastqty;
            inventory[coin].price = lastprice;

            const firstDate = dates[0];
            const firstqty = obj[coin][firstDate][1];
            const firstprice = obj[coin][firstDate][0];
            init[coin].qty = firstqty;
            init[coin].price = firstprice;
            init[coin].date = firstDate;
          }
          // for (let key in inventory) {
          //   if (inventory[key][1] === 0) {
          //     delete inventory[key]
          //   }
          //   if (init[key][1] === 0) {
          //     delete init[key]
          //   }
          // }
          const result = { timePeriodStart: init, timePeriodEnd: inventory };
          res.json(result);
        });
    });
  });

  return router;
};
