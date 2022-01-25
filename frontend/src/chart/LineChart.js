import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { format, compareAsc } from 'date-fns'
import axios from "axios";

const LineChart = (props) => {
  const [chart, setChart] = useState({ labels: [], data: [] });

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${props.coin}/market_chart/range?vs_currency=cad&from=1609477200&to=1642534784`
      )
      .then((res) => {
        const getGraph = res.data.prices;
        const labels = [];
        const prices = [];
        getGraph.map((x) => {
          labels.push(format(new Date(x[0]), 'LLL/dd/yyyy'));
          prices.push(x[1]);
        });
        setChart({ labels: labels, data: prices });
        console.log(getGraph);
        console.log("LABELS-----", labels);
      });
  }, []);
  useEffect(() => {
    const data = {
      labels: chart.labels,
      datasets: [
        {
          label: `${props.name}`,
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
                return index % 2 === 0 ? this.getLabelForValue(val) : "";
              },
            },
            title: {
              display: true,
              text: "Time",
              color: "#911",
              font: {
                family: "Times",
                size: 20,
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
                size: 20,
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
  }, [chart]);

  return (
    <div>
      <canvas id="myChart"></canvas>
    </div>
  );
};

export default LineChart;
