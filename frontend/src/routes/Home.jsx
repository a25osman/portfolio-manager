import React from "react";
import NavBar from "../components/NavBar";
import CryptoList from "../components/CryptoList";
import { useLocation } from "react-router";
import { useEffect, useState, createContext } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
    // headers: {"Access-Control-Allow-Origin": "http://localhost:3001", "Content-Type": "application/json"}
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

  return (
    <div>
      <NavBar
        login={login}
        errorCheck={errorCheck}
        currentUser={currentUser}
        setUsername={setUsername}
        setPassword={setPassword}
        logout={logout}
        username={username}
        password={password}
      />
      <h1>Tradeable Assets</h1>
      <div className="cryptolist">
        <CryptoList currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Home;
