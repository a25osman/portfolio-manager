import React from 'react'
import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import {TextField} from '@material-ui/core'
import {Button, InputLabel, Select, MenuItem, FormControl} from '@mui/material';


export const TransactionForm = (props) => {
  const [qty, setQty] = useState("");
  const [exchange_symbol, setSymbol] = useState("");
  const [exchange_value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [item, setItem] = useState("");

  const [crypto, setCrypto] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/portfolio/${"dsanders"}/inventory`)
      .then((res) => {
        const dataArray = [];
        for (const key in res.data.timePeriodEnd) {
          const coin = res.data.timePeriodEnd;
          dataArray.push(coin[key]);
        }
        setCrypto(dataArray);
      });
  }, []);

  const options = crypto.map((coinObj) => {
    return (
        <MenuItem value={coinObj.coin_name}>{coinObj.coin_name}</MenuItem>
    );
  });


  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("is it empty????", item, qty, exchange_symbol, exchange_value, date)
    axios
      .post(
        `http://localhost:3001/api/transactions/${'dsanders'}/${item}`,
        {qty, exchange_value, exchange_symbol, date},
        {withCredentials: true}
      )
  }

  return (
    <form onSubmit={handleSubmit}>
      
      {/* <InputLabel id="crypto">Cryptocoin</InputLabel>
      <Select label="Crypto" labelId="crypto" id="cryptos" value={item} onChange={event => setItem(event.target.value)}>
        {options}
      </Select> */}

      <Select id="crypto" value={item} onChange={event => setItem(event.target.value)}>
        {options}
      </Select>
      
      <TextField id="outlined-basic" label="Quantity" variant="outlined" value={qty} onChange={(event) => setQty(event.target.value)} />
      <TextField id="outlined-basic" label="Trading Pair" variant="outlined"  value={exchange_symbol} onChange={(event) => setSymbol(event.target.value)}/>
      <TextField id="outlined-basic" label="Value" variant="outlined"  value={exchange_value} onChange={(event) => setValue(event.target.value)}/>
      
      <TextField id="outlined-basic" label="Transaction Date" variant="outlined"  value={date} onChange={(event) => setDate(event.target.value)}/>
      

      <Button type="submit" variant="contained">Submit!</Button>    

    </form>
  )
}

export default TransactionForm;