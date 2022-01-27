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
import BasicModal from "../components/BasicModal";

import { UserContext } from "../App";
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
}));

const Portfolio = (props) => {
  const classes = useStyles();

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

  return (
    <>
      <CssBaseline />
      <NavBar currentUser={user} />
      <Container>
        <Typography
          marginTop="15px"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Dashboard
        </Typography>
        <PortfolioCharts currentUser={user.username} />
        <Holdings currentUser={user.username} />
        <BasicModal currentUser={user.username} />
      </Container>
    </>
    // <div>

    //   {/* <h2>Current Holdings</h2> */}
    //   <Box
    //     // className="portfolio"
    //     // sx={{
    //     //   width: "100%",
    //     //   height: 900,
    //     //   maxWidth: 1050,
    //     //   bgcolor: "background.paper",
    //     // }}
    //   >
    //     {/* <PortfolioCharts currentUser={user.username} /> */}
    // <Holdings currentUser={user.username} />
    //     <UserTransactions currentUser={user.username} />
    //   </Box>
    // </div>
  );
};

export default Portfolio;
