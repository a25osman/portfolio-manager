import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
} from "react-router-dom";

import Favorties from "./components/Favorites";
import Home from "./routes/Home";
import News from "./routes/News";
import Portfolio from "./routes/Portfolio";
import React from "react";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="news" element={<News />} />
        <Route path="portfolio" element={<Portfolio />} />
      </Routes>
    </div>
  );
}

export default App;
