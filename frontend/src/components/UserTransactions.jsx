import { Fragment, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import BasicModal from "./BasicModal";
import DeleteIcon from '@mui/icons-material/Delete'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip} from '@mui/material'

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const UserTransactions = (props) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/transactions/${props.currentUser}`)
      .then((res) => {
        console.log(res.data)
        setTransactions(res.data);
      });
  }, []);

  const transactionDelete = (transactionid) => {
    // event.preventDefault();
    console.log("Im here");
    axios
      .post(`http://localhost:3001/api/transactions/remove/${transactionid}/delete`, {}, { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      });
  };

  const table = transactions.map((transaction) => {
    const str = transaction.coin_name;
    return (
      <TableRow
        key={transaction.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell sx={{fontSize:16 }} component="th" scope="row" align='center'>{str.charAt(0).toUpperCase() + str.slice(1)}</TableCell>
        <TableCell sx={{fontSize:16 }} align="center">{transaction.coin_symbol.toUpperCase()}</TableCell>
        <TableCell sx={{fontSize:16 }} align="center">{Math.abs(transaction.quantity)}</TableCell>
        <TableCell sx={{fontSize:16 }} align="center">{transaction.quantity < 0 ? "Sell" : "Buy"}</TableCell>
        <TableCell sx={{fontSize:16 }} align="center">{transaction.exchange_symbol.toUpperCase()}</TableCell>
        <TableCell sx={{fontSize:16 }} align="center">{transaction.exchange_value ? formatter.format(transaction.exchange_value) : "-"}</TableCell>
        <TableCell sx={{fontSize:16 }} align="center">{transaction.date}</TableCell>
        <TableCell sx={{fontSize:16 }} align="center">
          {/* <Button type="submit" onClick={() => {transactionDelete(transaction.id);}} variant="contained">
            Delete
          </Button> */}
          <DeleteIcon type="submit" sx={{ color: "red", fontSize:40  }} onClick={() =>{transactionDelete(transaction.id);}}/>
        </TableCell>
      </TableRow>
    );
  })

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, fontSize:40 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontSize:20 }} display="flex" align="center" colSpan={8}>
              <BasicModal currentUser={props.currentUser} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{fontSize:18 }} align='center'>Name</TableCell>
            <TableCell sx={{fontSize:18 }} align="center">Symbol</TableCell>
            <TableCell sx={{fontSize:18 }} align="center">Quantity</TableCell>
            <TableCell sx={{fontSize:18 }} align="center">Type</TableCell>
            <TableCell sx={{fontSize:18 }} align="center">Trading&nbsp;Pair</TableCell>
            <TableCell sx={{fontSize:18 }} align="center">Exchange&nbsp;Value</TableCell>
            <TableCell sx={{fontSize:18 }} align="center">Transaction&nbsp;Date</TableCell>
            <TableCell sx={{fontSize:18 }} align="center">Remove Transaction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {table}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTransactions;
