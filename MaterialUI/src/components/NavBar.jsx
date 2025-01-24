import { Badge, Divider, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const NavBar = ({ darkMode, setDarkMode, setOpen }) => {
  return (
    <>
      <Toolbar>
        <IconButton onClick={() => setOpen(true)} color="inherit">
          <MenuIcon/>
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          ShopHub
        </Typography>
        <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <DarkModeIcon /> : <Brightness7Icon />}
        </IconButton>
        <IconButton color="inherit">
          <Badge badgeContent={2} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
      <Divider />
    </>
  );
};

export default NavBar;
