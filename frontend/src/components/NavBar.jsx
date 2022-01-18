import React from "react";
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

export default function NavBar(props) {
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

  const navigateFavorite = () => {};

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
        </Toolbar>
      </Container>
    </AppBar>
  );
}
