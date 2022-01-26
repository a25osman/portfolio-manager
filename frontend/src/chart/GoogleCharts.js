import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { useLocation } from "react-router";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";

const GoogleCharts = () => {
  const [chart, setChart] = useState({ labels: [], data: [] });
  //const [searchterm, setSearchterm] = useState("");
  //console.log("Searchterm is here", searchterm);
  const { state } = useLocation();
  const term = state ? state : "";
  console.log("Incoming data", term.searchterm);
  useEffect(() => {
    console.log("Search?", state);
    axios
      .get("http://localhost:3001/api/trends", {
        params: { state: term.searchterm },
      })

      .then((res) => {
        //console.log(res.data);
        setChart({ labels: res.data[0], data: res.data[1] });
      });
  }, []);

  useEffect(() => {
    var ctx = document.getElementById("myChart").getContext("2d");
    /*** Gradient ***/
    var gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(250,174,50,1)");
    gradient.addColorStop(1, "rgba(250,174,50,0)");
    const data = {
      labels: chart.labels,
      datasets: [
        {
          label: term ? `${term.searchterm}` : "crypto search trend",
          data: chart.data,
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
        responsive: true,
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Dates",
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
              text: "popularity percentage",
              font: {
                family: "Dates",
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
      {/* <Box
        className="trendssearch"
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        action="/favorites"
      >
        <TextField
          id="outlined-required"
          label="username"
          variant="filled"
          value={searchterm}
          onInput={(e) => setSearchterm(e.target.value)}
        />
      </Box> */}
    </div>
  );
};

export default GoogleCharts;
