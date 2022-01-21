import * as React from "react";
import GoogleCharts from "../chart/GoogleCharts";
import NavBar from "../components/NavBar";
export default function Favorties() {
  return (
    <div className="fav">
      <NavBar />
      <h1>Hello people</h1>
      <GoogleCharts />
    </div>
  );
}
