import React, { useState, useEffect, useContext } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { FixedSizeList } from "react-window";
import { UserContext } from "../App";
import DeleteIcon from '@mui/icons-material/Delete'

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

  const assetDelete = (assetid) => {
    // event.preventDefault();
    console.log("Im here");
    axios
      .post(`http://localhost:3001/api/portfolio/remove/${assetid}/delete`, {}, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      });
  };

  const table = crypto.map((coinObj) => {
    const str = coinObj.coin_name;
    return (
      <TableRow
        key={coinObj.coin_name}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell sx={{fontSize:16 }} component="th" scope="row" align='center'>{str.charAt(0).toUpperCase() + str.slice(1)}</TableCell>
        <TableCell sx={{fontSize:16 }} align="center">{coinObj.coin_symbol.toUpperCase()}</TableCell>
        <TableCell sx={{fontSize:16 }} align="center">{coinObj.qty ? coinObj.qty : "-"}</TableCell>
        <TableCell sx={{fontSize:16 }} align="center">{coinObj.price ? formatter.format(coinObj.price) : "-"}</TableCell>
        <TableCell sx={{fontSize:16 }} align="center">{coinObj.price ? formatter.format(coinObj.price * coinObj.qty) : "-"}</TableCell>
        <TableCell sx={{fontSize:16 }} align="center">
          {/* <Button type="submit" onClick={() => {transactionDelete(transaction.id);}} variant="contained">
            Delete
          </Button> */}
          <DeleteIcon sx={{ color: "red", fontSize:40  }} onClick={() =>{assetDelete(coinObj.asset_id);}}/>
        </TableCell>
      </TableRow>
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}  >
        <TableHead>
          <TableRow>
            <TableCell sx={{fontSize:20 }} align="center" colSpan={6}>
              <b>Current Tracked Assets</b>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{fontSize:18 }} align='center'>Name</TableCell>
            <TableCell sx={{fontSize:18 }} align="center">Symbol</TableCell>
            <TableCell sx={{fontSize:18 }} align="center">Quantity</TableCell>
            <TableCell sx={{fontSize:18 }} align="center">Price&nbsp;(CAD)</TableCell>
            <TableCell sx={{fontSize:18 }} align="center">Total&nbsp;Value&nbsp;(CAD)</TableCell>
            <TableCell sx={{fontSize:18 }} align="center">Remove&nbsp;Asset</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {table}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
