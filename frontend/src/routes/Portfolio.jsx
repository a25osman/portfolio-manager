import React from "react";
import NavBar from "../components/NavBar";
import LineChart from "../chart/LineChart";
import Search from "../components/Search";
import Box from "@mui/material/Box";
import { FixedSizeList } from "react-window";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import Coin from "../components/Coin";
import "../App.css";

const Portfolio = () => {
  const { state } = useLocation();
  const { image, name, symbol, price, market, priceChange } = state;
  return (
    <div>
      <NavBar />
      <h2>This is Portfolio Page</h2>
      <Box
        className="portfolio"
        sx={{
          width: "100%",
          height: 400,
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        <Coin
          // key={coin.id}
          image={image}
          name={name}
          symbol={symbol}
          price={price}
          //market={coin.market_cap}
          priceChange={priceChange}
        />
        {/* <Search />
        <FixedSizeList
          height={600}
          width={600}
          itemSize={115}
          itemCount={1}
          overscanCount={5}
          backgroundColor={"red"}
        ></FixedSizeList> */}
      </Box>
    </div>
  );
};

export default Portfolio;
