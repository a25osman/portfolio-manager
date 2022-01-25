import React from "react";
import { useEffect, useState, createContext } from "react";
import "../coin.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Favorties from "../routes/Favorites";
//import accessGlobalState, { userContext } from "./NavBar";
import { userContext } from "./NavBar";
import { useContext } from "react";
import { Typography } from "@mui/material";
import "../css/Newscss.css";

import axios from "axios";

const Coin = ({
  image,
  name,
  symbol,
  price,
  market,
  priceChange,
  props,
  currentUser,
}) => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const showChart = () => {
    navigate("viewcrypto", { state: { name, price, currentUser } });
  };
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  const loginconfig = {
    withCredentials: true,
  };

  const addToPortfolio = () => {
    // navigate("portfolio", {
    //   state: { image, name, symbol, price, market, priceChange },
    // });

    axios
      .post(
        `http://localhost:3001/api/portfolio/${currentUser.username}`,
        { coin: name.toLowerCase(), coin_symbol: symbol },
        loginconfig
      )
      .then((res) => {
        console.log("response is this; ", res.data);
      })

      .catch((err) => console.log("Error is this : ", err));
  };

  return (
    <div className="coin-container">
      <div className="coin-row">
        <div className="coin">
          <img src={image} alt="crypto" onClick={() => showChart()} />
          <br></br>
          <h1>{name}</h1>
          <p className="coin-sym">{symbol.toUpperCase()}</p>
          <p className="price">{formatter.format(price)}</p>
          {priceChange > 0 ? (
            <p className="priceChange green">{priceChange}%</p>
          ) : (
            <p className="priceChange red">{priceChange}%</p>
          )}
          <p className="mrk-cap">Mkt Cap:{formatter.format(market)}</p>
          {currentUser && (
            <Button onClick={() => addToPortfolio()} variant="contained">
              Add to Portfolio
            </Button>
          )}
        </div>
        <p>
          _____________________________________________________________________________________________________________________________________________________________
        </p>
      </div>
    </div>
  );
};

export default Coin;
