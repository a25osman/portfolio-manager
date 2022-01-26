const express = require("express");
const router = express.Router();

const googleTrends = require("google-trends-api");

module.exports = (db) => {
  // GET /api/trends
  router.get("/", (req, response) => {
    const d = new Date();
    console.log("Params coming in:", req.query.state);
    d.setDate(d.getDate() - 365);
    googleTrends
      .interestOverTime({
        keyword: `${req.query.state ? req.query.state : "Crypto"}`,
        startTime: d,
        endTime: new Date(),
      })
      .then((res) => {
        const label = [];
        const popularity = [];
        const info = JSON.parse(res);
        const list = info.default.timelineData;
        for (let object of list) {
          label.push(object.formattedAxisTime);
          popularity.push(object.value[0]);
          // console.log("label: ", object.formattedAxisTime, "popularity : ", object.value[0])
        }
        const result = [label, popularity];
        response.json(result);
      })
      .catch((err) => console.log(err));
  });

  return router;
};
