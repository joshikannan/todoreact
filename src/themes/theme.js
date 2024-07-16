import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ef6c00", // Customize your primary color
    },
    secondary: {
      main: "#ffffff", // Customize your secondary color
    },
  },
});

export default theme;
