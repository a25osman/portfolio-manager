import React, { useState, useEffect } from 'react'
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import axios from 'axios';


const LineChart = () => {
  const [chart, setChart] = useState({labels: [], data:[]})
  


  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/ethereum/market_chart/range?vs_currency=cad&from=1609477200&to=1642534784")
      .then((res) => {
        const getGraph = res.data.prices;
        const labels = [];
        const prices = [];
        getGraph.map(x => {
          labels.push(x[0]) 
          prices.push(x[1])
        }) 
        setChart({labels : labels ,data : prices});
        console.log(getGraph)
      });
  }, []);

 useEffect (()=>{
  const data = {
    labels: chart.labels,
    datasets: [{
      label: 'Ethereum',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: chart.data,
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

  return function destory(){
    myChart.destroy();
  }
 },[chart]);

  return(
    <div>
  <canvas id="myChart"></canvas>
</div>
  )
};

export default LineChart;