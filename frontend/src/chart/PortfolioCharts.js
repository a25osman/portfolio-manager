import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios";

const PortfolioCharts = (props) => {
  const [chart, setChart] = useState({ labels: [], datasets: [] });
  console.log("Current user", props.currentUser);
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/portfolio/${props.currentUser}`)
      .then((res) => {
        const getDaysArray = function (start, end) {
          let arr = [];
          for (
            let dt = new Date(start);
            dt <= end;
            dt.setDate(dt.getDate() + 1)
          ) {
            arr.push(new Date(dt));
          }
          return arr;
        };

        axios
          .get(
            `http://localhost:3001/api/portfolio/${props.currentUser}/inventory`
          )
          .then((resp) => {
            const coinObj = resp.data.timePeriodStart;
            const today = new Date();
            let tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 10);
            let firstDay = new Date(tomorrow);

            for (let key in coinObj) {
              const currentDate = coinObj[key].date;

              if (currentDate) {
                if (new Date(currentDate) < firstDay) {
                  firstDay = coinObj[key].date;
                }
              }
            }

            const coins = {};
            for (let obj of res.data) {
              for (let key in obj) {
                coins[key] = obj[key];
              }
            }

            const values = {};
            const allDays = getDaysArray(new Date(firstDay), new Date());
            for (let date of allDays) {
              values[date.toLocaleDateString("en-US")] = 0;
            }

            for (let coin in coins) {
              for (let date in values) {
                if (coins[coin][date]) {
                  const amt = coins[coin][date][2];
                  values[date] += amt;
                }
              }
            }
            console.log(values);
            // PLEASE GRAPHS values --> it is an object and it is not sorted yet
            // PLEASE GRAPHS values --> it is an object and it is not sorted yet
            // PLEASE GRAPHS values --> it is an object and it is not sorted yet
            // PLEASE GRAPHS values --> it is an object and it is not sorted yet
            // PLEASE GRAPHS values --> it is an object and it is not sorted yet
            // PLEASE GRAPHS values --> it is an object and it is not sorted yet
            // PLEASE GRAPHS values --> it is an object and it is not sorted yet
            // PLEASE GRAPHS values --> it is an object and it is not sorted yet
            // PLEASE GRAPHS values --> it is an object and it is not sorted yet

            // //color library for multiple line
            // const colors = ["red", "blue", "green", "purple"];

            // // building the labels (x-axis) array
            // const crypto = res.data[0];
            // const name = Object.keys(crypto)[0];
            // // something like crypto.bitcoin, we do [name] because the name of the coin is dynamic
            // const cryptoInformation = crypto[name];
            // // from the timeframe(the key), re-order to the accending dates
            // const labels = Object.keys(cryptoInformation).sort((a, b) => a - b);

            // // building the data points (y-axis)
            // const datasets = res.data.map((crypto, i) => {
            //   let name = Object.keys(crypto)[0];
            //   let cryptoInformation = crypto[name];
            //   cryptoInformation = Object.entries(cryptoInformation).sort((a, b) => {
            //     return a[0] - b[0];
            //   });

            //   cryptoInformation = cryptoInformation.map((d) => d[1][0]);

            //   return {
            //     label: name,
            //     data: cryptoInformation,
            //     borderColor: colors[i],
            //     backgroundColor: colors[i],
            //   };
            // });

            // setChart((prev) => {
            //   return { labels, datasets };
            // });
          })
          .catch((err) => console.log(err));
      });
  }, []);

  useEffect(() => {
    const config = {
      type: "line",
      data: chart,
      options: {
        scales: {
          x: {
            ticks: {
              // For a category axis, the val is the index so the lookup via getLabelForValue is needed
              callback: function (val, index) {
                // Hide the label of every 2nd dataset
                let label = this.getLabelForValue(val);
                label = label.split("/");
                const year = label[2];
                const month = label[0];
                //console.log(month);
                label = "";
                if (month < 4) {
                  label = "Q1";
                } else if (month < 7) {
                  label = "Q2";
                } else if (month < 10) {
                  label = "Q3";
                } else {
                  label = "Q4";
                }
                label = label + " " + year;
                return index % 5 === 0 ? label : "";
              },
            },
          },
          y: {
            display: true,
            type: "logarithmic",
          },
        },
      },
    };

    const myChart = new Chart(document.getElementById("myChart"), config);

    return function destory() {
      myChart.destroy();
    };
  }, [chart]);

  return (
    <div>
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default PortfolioCharts;
