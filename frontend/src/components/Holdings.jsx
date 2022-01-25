import React, { useState, useEffect, useContext } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { FixedSizeList } from "react-window";
import { UserContext } from "../App";

export default function Holdings(props) {
  const [crypto, setCrypto] = useState([]);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/portfolio/${props.currentUser}/inventory`)
      .then((res) => {
        const dataArray = [];
        for (const key in res.data.timePeriodEnd) {
          const coin = res.data.timePeriodEnd;
          dataArray.push(coin[key]);
        }
        setCrypto(dataArray);
      });
  }, []);

  const table = crypto.map((coinObj) => {
    return (
      <tr>
        <td>{coinObj.coin_name}</td>
        <td>{coinObj.coin_symbol}</td>
        <td>{coinObj.qty}</td>
        <td>{coinObj.price}</td>
      </tr>
    );
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Symbol</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{table}</tbody>
      </table>
    </div>
  );
}
