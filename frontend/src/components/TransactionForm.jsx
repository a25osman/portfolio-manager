import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { TextField, Typography } from "@material-ui/core";
import {

  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Stack,
} from "@mui/material";

export const TransactionForm = (props) => {
  const [qty, setQty] = useState("");
  const [exchange_symbol, setSymbol] = useState("");
  const [exchange_value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [item, setItem] = useState("");

  const [crypto, setCrypto] = useState([]);

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

  const options = crypto.map((coinObj) => {
    return <MenuItem key={coinObj.coin_name} value={coinObj.coin_name}>{coinObj.coin_name}</MenuItem>;
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.reload(false);
    console.log(
      "is it empty????",
      item,
      qty,
      exchange_symbol,
      exchange_value,
      date
    );
    axios.post(
      `http://localhost:3001/api/transactions/${props.currentUser}/${item}`,
      { qty, exchange_value, exchange_symbol, date },
      { withCredentials: true }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <Typography variant="h5" align="center" gutterBottom> Transaction Form </Typography>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Coin</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Coin"

            value={item}
            onChange={(event) => setItem(event.target.value)}
          >
            {options}
          </Select>

        </FormControl>

        <TextField
          id="outlined-basic"
          label="Quantity"
          variant="outlined"
          value={qty}
          onChange={(event) => setQty(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Trading Pair"
          variant="outlined"
          value={exchange_symbol}
          onChange={(event) => setSymbol(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Value"
          variant="outlined"
          value={exchange_value}
          onChange={(event) => setValue(event.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="Transaction Date"
          variant="outlined"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />

        <Button type="submit" variant="contained">
          Submit!
        </Button>
      </Stack>
    </form>
  );
};

export default TransactionForm;
