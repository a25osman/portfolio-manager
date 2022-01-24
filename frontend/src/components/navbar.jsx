import React, { useEffect, useState, createContext, useContext } from "react";
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
import { UserContext } from "../App";

export default function NavBar(props) {
  const {
    login,
    logout,
    currentUser,
    errorCheck,
    setPassword,
    setUsername,
    username,
    password,
  } = useContext(UserContext);
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [currentUser, setCurrentUser] = useState("null");
  const globalState = currentUser;
  //const [errorCheck, setErrorCheck] = useState(null);
  let navigate = useNavigate();
  const pages = ["My Portfolio", "My favorties", "News"];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const loginconfig = {
    withCredentials: true,
  };

  const loggedinuser = props.currentUser;

  const ErrorMessage = () => {
    return (
      <div>
        <Typography>
          <div>Impossible</div>
        </Typography>
      </div>
    );
  };

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
            {currentUser && (
              <Button
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={async () => {
                  //navigate(`/portfolio`);
                  navigate("portfolio", {
                    state: { user: currentUser },
                  });
                }}
              >
                {"My Portfolio"}
              </Button>
            )}
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={async () => {
                navigate("/favorites");
              }}
            >
              {"Search Trends"}
            </Button>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={async () => {
                navigate("/news", { state: { loggedinuser } });
              }}
            >
              {"News"}
            </Button>
          </Box>
          {!currentUser && (
            <Box
              component="form"
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
              <Typography>Incorrect Username and/or Password</Typography>
            </Box>
          )}
          {currentUser && (
            <Box component="form">
              <Typography>Hello, {currentUser.username}</Typography>
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
