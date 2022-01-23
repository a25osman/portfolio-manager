import React from "react";
import NavBar from "../components/NavBar";
import LineChart from "../chart/LineChart";
import { useLocation } from "react-router";
import Box from "@mui/material/Box";

const ViewCrypto = (props) => {
  const { state } = useLocation();
  const { name, price, currentUser } = state;

  return (
    <div>
      <NavBar currentUser={currentUser} />
      <h2>{name}</h2>

      <Box
        sx={{
          width: "100%",
          height: 800,
          maxWidth: 1100,
          bgcolor: "background.paper",
        }}
      >
        <LineChart coin={name.toLowerCase()} name={name} />
      </Box>
    </div>
  );
};

export default ViewCrypto;
