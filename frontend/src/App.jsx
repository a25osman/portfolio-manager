import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import { useEffect, useState, createContext } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
} from "react-router-dom";

import Favorties from "./routes/Favorites";
import ViewCrypto from "./routes/ViewCrypto";
import Home from "./routes/Home";
import News from "./routes/News";
import Portfolio from "./routes/Portfolio";
import React from "react";
import viewCrypto from "./routes/ViewCrypto";

export const UserContext = createContext();
function App() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState("null");
  const [errorCheck, setErrorCheck] = useState(null);

  const ErrorMessage = () => {
    return (
      <div>
        <Typography>
          <div>Impossible</div>
        </Typography>
      </div>
    );
  };
  const loginconfig = {
    withCredentials: true,
  };
  const login = (event) => {
    event.preventDefault();
    axios
      .post(
        "http://localhost:3001/api/users/login",
        { username: username, password: password },
        loginconfig
      )
      .then((res) => {
        setCurrentUser(res.data);
        setErrorCheck(null);
      })

      .catch(() => setErrorCheck("Error"));
  };

  const logout = (event) => {
    navigate("/");

    event.preventDefault();
    axios
      .post("http://localhost:3001/api/users/logout", {}, loginconfig)
      .then((res) => setCurrentUser(null));
  };

  useEffect(() => {
    axios
      .post("http://localhost:3001/api/users/authenticate", {}, loginconfig)
      .then((res) => setCurrentUser(res.data));
  }, []);

  const data = {
    login,
    logout,
    currentUser,
    errorCheck,
    setPassword,
    setUsername,
    username,
    password,
  };

  return (
    <div className="App">
      <UserContext.Provider value={data}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="news" element={<News />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="favorites" element={<Favorties />} />
          <Route path="viewcrypto" element={<ViewCrypto />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
