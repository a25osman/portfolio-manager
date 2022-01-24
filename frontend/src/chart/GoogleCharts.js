import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios"

const GoogleCharts = () => {
  const [chart, setChart] = useState({ labels: [], data: [] });

  useEffect(() => {
    axios.get("http://localhost:3001/api/trends")
    .then((res) => {
      console.log(res.data)
      setChart({ labels: res.data[0], data: res.data[1] });
    });
  }, []);

  useEffect(() => {
    const data = {
      labels: chart.labels,
      datasets: [
        {
          label: `Search history`,
          backgroundColor: "rgb(47, 247, 237)",
          borderColor: "rgb(255, 99, 132)",
          data: chart.data,
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
        title: {
          display: true,
          text: 'Dates',
          font: {
            family: 'Times',
            size: 20,
            style: 'normal',
            lineHeight: 1.2
          },
          padding: {top: 20, left: 0, right: 0, bottom: 0}
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'popularity percentage',
          font: {
            family: 'Dates',
            size: 20,
            style: 'normal',
            lineHeight: 1.2
          },
          padding: {top: 20, left: 0, right: 0, bottom: 0}
        }
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

export default GoogleCharts;
