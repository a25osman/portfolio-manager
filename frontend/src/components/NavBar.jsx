import React, { useState } from "react";
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
  let navigate = useNavigate();
  const pages = ["My Portfolio", "My favorties", "News"];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [currentUser, setCurrentUser] = useState(null);

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

  const login = () => {
    axios.post("/api/login").then((res) => setCurrentUser(res.data));
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
              defaultValue=""
              variant="filled"
            />
            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="filled"
            />

            {!currentUser && (
              <Button onClick={login} variant="contained">
                Submit
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
