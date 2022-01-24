import React from "react";
import NavBar from "../components/NavBar";
import LineChart from "../chart/LineChart";
import Search from "../components/Search";
import Box from "@mui/material/Box";
import { FixedSizeList } from "react-window";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { useEffect, useState, useContext } from "react";
import Coin from "../components/Coin";
import "../App.css";
import axios from "axios";
import PortfolioCharts from "../chart/PortfolioCharts";
import Holdings from "../components/Holdings";
import UserTransactions from "../components/UserTransactions";
import { UserContext } from "../App";

const Portfolio = (props) => {
  const { state } = useLocation();
  const { user } = state;
  const { login, logout, currentUser } = useContext(UserContext);
  const coinData = [];
  const loginconfig = {
    withCredentials: true,
  };

  axios
    .get(
      `http://localhost:3001/api/portfolio/${currentUser.username}`,
      { username: currentUser.username },
      loginconfig
    )
    .then((res) => {
      res.data.forEach((element) => {
        for (const property in element) {
          coinData.push(property);
        }
      });
    });
  console.log(currentUser);
  return (
    <div>
      <NavBar currentUser={user} />
      <h2>Current Holdings</h2>
      <Box
        className="portfolio"
        sx={{
          width: "100%",
          height: 400,
          maxWidth: 1050,
          bgcolor: "background.paper",
        }}
      >
        <PortfolioCharts currentUser={currentUser.username} />
        <Holdings />
        <UserTransactions />
      </Box>
    </div>
  );
};

export default Portfolio;
