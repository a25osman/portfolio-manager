import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
const { google_api } = require ("../../googleTrends")

const GoogleCharts = () => {
  const [chart, setChart] = useState({ labels: [], data: [] });

  useEffect(()=>{
    google_api().then((res) =>{setChart({ labels: res[0], data: res[1] })})
  },[]);

  useEffect(() => {
    
    const data = {
      labels: chart.labels,
      datasets: [
        {
          label: `Search history`,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: chart.data,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {},
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