import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { Link, NavLink, Router } from "react-router-dom";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Favorites from "../routes/Favorites";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";

export default function NavBar(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState("null");
  const [errorCheck, setErrorCheck] = useState(null);
  let navigate = useNavigate();
  const pages = ["My Portfolio", "My favorties", "News"];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const loginconfig = {
    withCredentials: true,
    // headers: {"Access-Control-Allow-Origin": "http://localhost:3001", "Content-Type": "application/json"}
  };
  const logoutconfig = {
    method: "POST",
    credentials: "same-origin",
    // headers: {"Access-Control-Allow-Origin": "http://localhost:3001", "Content-Type": "application/json"}
  };

  const ErrorMessage = () => {
    return (
      <div>
        <Typography>
          <div>Impossible</div>
        </Typography>
      </div>
    );
  };

  const login = (event) => {
    event.preventDefault();
    // You should see email and password in console.
    // ..code to submit form to backend here...

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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 2, display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{ my: 1, color: "white", display: "block" }}
              onClick={async () => {
                navigate("/");
              }}
            >
              {<h2>Portfolio App</h2>}
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={async () => {
                navigate("/portfolio");
              }}
            >
              {"My Portfolio"}
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={async () => {
                navigate("/favorites");
              }}
            >
              {"My Favorites"}
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={async () => {
                navigate("/news");
              }}
            >
              {"News"}
            </Button>
          </Box>
          {!currentUser && (
            <Box
              component="form"
              //onSubmit={login}
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
              action="/news"
            >
              <TextField
                id="outlined-required"
                label="username"
                variant="filled"
                value={username}
                onInput={(e) => setUsername(e.target.value)}
              />
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="filled"
                value={password}
                onInput={(e) => setPassword(e.target.value)}
              />

              <Button type="submit" onClick={login} variant="contained">
                Login
              </Button>
            </Box>
          )}
          {errorCheck && (
            <Box>
              <Typography>
                <div>Incorrect Username and/or Password</div>
              </Typography>
            </Box>
          )}
          {currentUser && (
            <Box component="form" onSubmit={logout}>
              <Typography>
                <div>Hello, {currentUser.username}</div>
              </Typography>
              <Button type="submit" onClick={logout} variant="contained">
                Logout
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
