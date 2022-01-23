import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { FixedSizeList } from "react-window";

export default function Holdings(props) {
  const [crypto, setCrypto] = useState("");
  const userdata = {};
  let dataArray = [];
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/portfolio/dsanders/inventory`)
      .then((res) => {
        for (const key in res.data.timePeriodEnd) {
          userdata[key] = res.data.timePeriodEnd[key];
          dataArray.push([key, res.data.timePeriodEnd[key].coin_symbol]);
        }
        console.log(dataArray);
      });
  });
  function renderTable() {
    dataArray.map((x) => {
      return (
        <tr>
          <td>{x[0]}</td>
        </tr>
      );
    });
  }
  console.log(renderTable);
  return (
    <div>
      <table>
        <tr>
          <td>Coin</td>
          <td>Symbol</td>
          <td>Qty</td>
          <td>Price</td>
        </tr>
        <div>{renderTable}</div>
      </table>
    </div>
  );
}
