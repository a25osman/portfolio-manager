import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const PortfolioCharts = (props) => {
  const [chart, setChart] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(false);

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
    var ctx = document.getElementById("myChart").getContext("2d");
    /*** Gradient ***/
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(250,174,50,1)');
    gradient.addColorStop(1, 'rgba(250,174,50,0)');
    const data = {
      labels: chart.labels,
      datasets: [
        {
          label: `Portfolio Value`,
          data: chart.data,
          pointRadius: 0,
          backgroundColor: gradient,
          borderColor: "rgb(255, 99, 132)",
          pointRadius: 0,
          fill: true,
          fillTarget: gradient, // Put the gradient here as a fill color                     
          strokeColor: "#ff6c23",
          pointColor: "#fff",
          pointStrokeColor: "#ff6c23",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "#ff6c23",
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {
        plugins: {
          title: {
              display: true,
              text: 'Your Portfolio ',
              font: {
                family: "Roboto",
                size: 30,
                style: "normal",
                lineHeight: 1.2,
              },
              align:"start",
          }
      },
        responsive: true,
        scales: {
          x: {
            display: true,
            ticks: {
              // For a category axis, the val is the index so the lookup via getLabelForValue is needed
              callback: function (val, index) {
                // Hide the label of every 2nd dataset
                return index % 5 === 0 ? this.getLabelForValue(val) : "";
              },
            },
            grid:{
              display:false,
              
            },
            title: {
              display: true,
              color: "#911",
              font: {
                family: "Roboto",
                size: 15,
                style: "normal",
                lineHeight: 1.2,
              },
              padding: { top: 0, left: 0, right: 0, bottom: 0 },
            },
          },
          y: {
            display: true,
            ticks: {
              callback: function (value, index, ticks) {
                return '$' + value;
              }
            },
            title: {
              display: true,
              color: "#911",
              font: {
                family: "Roboto",
                size: 15,
                style: "normal",
                lineHeight: 1.2,
              },
              padding: { top: 0, left: 0, right: 0, bottom: 0 },
            },
          },
        },
      },
    };
    const myChart = new Chart(document.getElementById("myChart"), config);

    return function destory() {
      myChart.destroy();
    };
  }, [chart, loading]);

  return (
    <div>
      {/* { loading ? <CircularProgress /> : <canvas id="myChart"></canvas> } */}
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default PortfolioCharts;
