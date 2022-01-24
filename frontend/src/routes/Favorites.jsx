import * as React from "react";
import GoogleCharts from "../chart/GoogleCharts";
import NavBar from "../components/NavBar";
import PortfolioCharts from "../chart/PortfolioCharts";
import UserTransactions from "../components/UserTransactions";
import { Box } from "@mui/system";
export default function Favorties() {
  return (
    <div className="fav">
      <NavBar />
      <h1>Google Search Trends</h1>
      <Box
        className="portfolio"
        sx={{
          width: "100%",
          height: 400,
          maxWidth: 1050,
          bgcolor: "background.paper",
        }}
      >
        <GoogleCharts />
      </Box>
    </div>
  );
}
