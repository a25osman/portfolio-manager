import { Fragment, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";

const UserTransactions = (props) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/transactions/${props.currentUser}`)
      .then((res) => {
        setTransactions(res.data);
      });
  }, []);

  const transactionDelete = (transactionid) => {
    console.log("Im here");
    axios
      .post(`http://localhost:3001/api/transactions/${transactionid}/delete`)
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <div className="Table">
      <table>
        <thead>
          <tr>
            <th>Coins Name:</th>
            <th>Coins Symbol:</th>
            <th>Amount in Own:</th>
            <th>Currency:</th>
            <th>Coins value:</th>
            <th>Date Bought:</th>
            <th>Delete Button:</th>
          </tr>
        </thead>
        {transactions.map((transaction) => {
          return (
            <>
              <tbody>
                <tr key={transaction.id}>
                  <td>{transaction.coin_name}</td>
                  <td>{transaction.coin_symbol}</td>
                  <td>{transaction.quantity}</td>
                  <td>{transaction.exchange_symbol}</td>
                  <td>{transaction.exchange_value}</td>
                  <td>{transaction.date}</td>
                  <td>
                    <Button
                      type="submit"
                      onClick={() => {
                        transactionDelete(transaction.id);
                      }}
                      variant="contained"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              </tbody>

              {/* <p>Coins Name: {transaction.coin_name}</p>
                  <p>Coins Symbol: {transaction.coin_symbol}</p>
                  <p>Amount in Own: {transaction.quantity}</p>
                  <p>Currency: {transaction.exchange_symbol}</p>
                  <p>Coins value: {transaction.exchange_value}</p>
                  <p>Date Bought: {transaction.date} </p>
                  <button onClick={transactionDelete(transaction.id)}>Delete Button</button> */}
            </>
          );
        })}
      </table>
    </div>
  );
};

export default UserTransactions;
