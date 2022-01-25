import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const PortfolioCharts = (props) => {
  const [chart, setChart] = useState({ labels: [], datasets: [] });
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
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

            const xvalues = [];
            const yvalues = [];
            const allDays = getDaysArray(new Date(firstDay), new Date());
            allDays.forEach((date, index) => {
              if (index < allDays.length - 1) {
                xvalues.push(date.toLocaleDateString("en-US"));
                yvalues.push(0);
              }
            });

            for (let coin in coins) {
              xvalues.forEach((date, index) => {
                if (coins[coin][date]) {
                  const i = xvalues.indexOf(date);
                  const amt = coins[coin][date][2];
                  yvalues[i] += amt;
                }
              });
            }

            setChart({ labels: xvalues, data: yvalues });
            setLoading(false);
          })
          .catch((err) => console.log(err));
      });
  }, []);

  useEffect(() => {
    const data = {
      labels: chart.labels,
      datasets: [
        {
          label: `My Portfolio`,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: chart.data,
          pointRadius: 0,  
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            ticks: {
              // For a category axis, the val is the index so the lookup via getLabelForValue is needed
              callback: function (val, index) {
                // Hide the label of every 2nd dataset
                return index % 3 === 0 ? this.getLabelForValue(val) : "";
              },
            },
            title: {
              display: true,
              text: "Date",
              color: "#911",
              font: {
                family: "Times",
                size: 15,
                style: "normal",
                lineHeight: 1.2,
              },
              padding: { top: 20, left: 0, right: 0, bottom: 0 },
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Price",
              color: "#911",
              font: {
                family: "Times",
                size: 15,
                style: "normal",
                lineHeight: 1.2,
              },
              padding: { top: 20, left: 0, right: 0, bottom: 0 },
            },
          },
        },
      },
    };
    const myChart = new Chart(document.getElementById("myChart"), config);

    return function destory() {
      myChart.destroy();
    };
  }, [chart,loading]);

  return (
    <div>
     { loading ? <CircularProgress /> : <canvas id="myChart"></canvas> }
    </div>
  );
};

export default PortfolioCharts;
