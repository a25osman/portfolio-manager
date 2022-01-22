import React from "react";
import "../coin.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Favorties from "../routes/Favorites";
//import accessGlobalState, { userContext } from "./NavBar";
import { userContext } from "./NavBar";
import { useContext } from "react";
import { Typography } from "@mui/material";

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
  const showChart = () => {
    navigate("viewcrypto", { state: { name, price } });
  };
  const addToPortfolio = () => {
    navigate("portfolio", {
      state: { image, name, symbol, price, market, priceChange },
    });
  };

  return (
    <div className="coin-container">
      <div className="coin-row">
        <div className="coin">
          <img src={image} alt="crypto" onClick={() => showChart()} />
          <div className="namesymbol">
            <h1>{name}</h1>
            <p className="coin-sym">{symbol}</p>
          </div>
        </div>
        <div className="data">
          <p className="price">${price}</p>
          {/* <p className="mrk-cap">${}</p> */}
          {priceChange > 0 ? (
            <p className="priceChange green">{priceChange}%</p>
          ) : (
            <p className="priceChange red">{priceChange}%</p>
          )}
        </div>
        {currentUser && (
          <div className="addTo">
            <Button onClick={() => addToPortfolio()} variant="contained">
              Add to Portfolio
            </Button>
            <Button variant="contained">Add to Favorites</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coin;
