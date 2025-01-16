import React, { useState } from "react";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Container,
} from "@mui/material";
import NavBar from "./components/NavBar";
import Products from "./components/Products";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Create a custom theme
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Products darkMode={darkMode}/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
