import * as React from "react";
import GoogleCharts from "../chart/GoogleCharts";
import NavBar from "../components/NavBar";
import PortfolioCharts from "../chart/PortfolioCharts";
export default function Favorties() {
  return (
    <div className="fav">
      <NavBar />
      <h1>Google Search Trends</h1>
      <GoogleCharts />
    </div>
  );
}
