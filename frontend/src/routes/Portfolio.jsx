import React from "react";
import NavBar from "../components/NavBar";
import LineChart from "../chart/LineChart";

const portfolio = () => {
  return (
    <div>
      <NavBar />
      <h2>This is Portfolio Page</h2>
      <LineChart />
    </div>
  );
};

export default portfolio;
