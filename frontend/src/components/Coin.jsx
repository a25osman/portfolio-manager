import React from "react";
import "../coin.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Favorties from "../routes/Favorites";

const Coin = ({ key, image, name, symbol, price, market, priceChange }) => {
  let navigate = useNavigate();
  const showChart = () => {
    navigate("viewcrypto", { state: { name, price, key } });
  };
  return (
    <div className="coin-container">
      <div className="coin-row">
        <div className="coin">
          <img src={image} alt="crypto" onClick={() => showChart()} />
          <div class="namesymbol">
            <h1>{name}</h1>
            <p className="coin-sym">{symbol}</p>
          </div>
        </div>
        <div className="data">
          <p className="price">${price}</p>
          {/* <p className="mrk-cap">${market}</p> */}
          {priceChange > 0 ? (
            <p className="priceChange green">{priceChange}%</p>
          ) : (
            <p className="priceChange red">{priceChange}%</p>
          )}
        </div>
        <div className="addTo">
          <Button variant="contained">Add to Portfolio</Button>
          <Button variant="contained">Add to favorites</Button>
        </div>
      </div>
    </div>
  );
};

export default Coin;
