import React, { useEffect, useState, createContext, useContext } from "react";
import GoogleCharts from "../chart/GoogleCharts";
import NavBar from "../components/NavBar";
import PortfolioCharts from "../chart/PortfolioCharts";
import UserTransactions from "../components/UserTransactions";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import SearchTerms from "../components/SearchTerms";
import "../css/favoritepage.css";
//import { Typography } from "@material-ui/core/styles/createTypography";
import { Typography } from "@mui/material";
export default function Favorties() {
  // const [searchterm, setSearchterm] = useState("");
  // let navigate = useNavigate();
  // function search(event) {
  //   event.preventDefault();
  //   navigate("/favorites", { state: { searchterm } });
  // }
  return (
    <div className="fav">
      <NavBar />
      <Typography
        marginTop="15px"
        variant="h2"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Google Search Trends
      </Typography>

      <div className="favoritepage">
        <Box
          sx={{
            width: "100%",
            height: 50,
            maxWidth: 1050,
            bgcolor: "background.paper",
          }}
        >
          <GoogleCharts />
        </Box>
        <SearchTerms />
      </div>
    </div>
  );
}
