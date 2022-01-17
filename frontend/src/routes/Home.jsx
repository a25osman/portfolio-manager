import React from "react";
import NavBar from "../components/NavBar";
import CryptoList from "../components/CryptoList";

const Home = () => {
  return (
    <div>
      <NavBar />
      <h1>Tradeable Assets</h1>
      <CryptoList />
    </div>
  );
};

export default Home;
