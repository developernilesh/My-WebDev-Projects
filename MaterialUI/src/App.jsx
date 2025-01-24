import React, { useState } from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import DevicesIcon from "@mui/icons-material/Devices";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import BookIcon from "@mui/icons-material/Book";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ListAltIcon from "@mui/icons-material/ListAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavBar from "./components/NavBar";
import Products from "./components/Products";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [open, setOpen] = useState(false);

  // Create a custom theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
      <List>
        <ListItem disablePadding sx={{ display: "flex", justifyContent: "flex-end" }}>
          <ListItemIcon>
            <ArrowCircleLeftOutlinedIcon />
          </ListItemIcon>
        </ListItem>
      </List>
      <Divider />
      <List>
        {/* Product categories */}
        <ListItem disablePadding>
          <ListItemText primary="Categories" sx={{ pl: 2, fontWeight: "bold" }} />
        </ListItem>
        {[
          { text: "Electronics", icon: <DevicesIcon /> },
          { text: "Clothing", icon: <ShoppingBagIcon /> },
          { text: "Books", icon: <BookIcon /> },
          { text: "Home & Garden", icon: <HomeIcon /> },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {/* Account options */}
        <ListItem disablePadding>
          <ListItemText primary="Account" sx={{ pl: 2, fontWeight: "bold" }} />
        </ListItem>
        {[
          { text: "Profile", icon: <PersonIcon /> },
          { text: "Orders", icon: <ListAltIcon /> },
          { text: "Wishlist", icon: <FavoriteIcon /> },
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} setOpen={setOpen} />
        <Products darkMode={darkMode} />
      </Container>
      <Drawer open={open} onClose={() => setOpen(false)}>
        {DrawerList}
      </Drawer>
    </ThemeProvider>
  );
}

export default App;
