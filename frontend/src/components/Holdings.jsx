import React, { useState, useEffect, useContext } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { FixedSizeList } from "react-window";
import { UserContext } from "../App";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material'


export default function Holdings(props) {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
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
    const str = coinObj.coin_name;
    return (
      <TableRow
        key={coinObj.coin_name}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row" align='center'>{str.charAt(0).toUpperCase() + str.slice(1)}</TableCell>
        <TableCell align="center">{coinObj.coin_symbol.toUpperCase()}</TableCell>
        <TableCell align="center">{coinObj.qty ? coinObj.qty : "-"}</TableCell>
        <TableCell align="center">{coinObj.price ? formatter.format(coinObj.price) : "-"}</TableCell>
        <TableCell align="center">{coinObj.price ? formatter.format(coinObj.price * coinObj.qty) : "-"}</TableCell>
      </TableRow>
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center'>Name</TableCell>
            <TableCell align="center">Symbol</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Price&nbsp;(USD)</TableCell>
            <TableCell align="center">Total&nbsp;Value&nbsp;(USD)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {table}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
