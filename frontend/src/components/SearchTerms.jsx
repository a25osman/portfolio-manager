import React, { useEffect, useState, createContext, useContext } from "react";
import GoogleCharts from "../chart/GoogleCharts";
import NavBar from "./NavBar";
import PortfolioCharts from "../chart/PortfolioCharts";
import UserTransactions from "../components/UserTransactions";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import "../css/favoritepage.css";
export default function SearchTerms() {
  const [searchterm, setSearchterm] = useState("");
  let navigate = useNavigate();
  function search(event) {
    event.preventDefault();
    navigate("/favorites", { state: { searchterm } });
    window.location.reload(false);
  }
  return (
    <div className="fav">
      <Box
        className="trendssearch"
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        //action="/"
      >
        <TextField
          id="outlined-required"
          label="search here"
          variant="filled"
          value={searchterm}
          onInput={(e) => setSearchterm(e.target.value)}
        />

        <Button type="submit" onClick={search} variant="contained">
          Search!
        </Button>
      </Box>
    </div>
  );
}
