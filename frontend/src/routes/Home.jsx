import React from "react";
import NavBar from "../components/NavBar";
import CryptoList from "../components/CryptoList";
import { useLocation } from "react-router";

const Home = () => {
  return (
    <div>
      <NavBar />
      <h1>Tradeable Assets</h1>
      <div className="cryptolist">
        <CryptoList />
      </div>
    </div>
  );
};

export default Home;
