import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffb550",
      contrastText: "#000000",
    },
    secondary: {
      main: "#787ff6",
      blueShade: "#a6aafa"
    },
    background: {
      default: "#0F1014",
      paper: "#1A1B23",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    h1: { fontFamily: "'Syncopate', sans-serif", fontWeight: 700 },
    h2: { fontFamily: "'Syncopate', sans-serif", fontWeight: 700 },
    h3: { fontFamily: "'Syncopate', sans-serif", fontWeight: 700 },
    h4: { fontFamily: "'Syncopate', sans-serif", fontWeight: 700 },
    h5: { fontFamily: "'Syncopate', sans-serif", fontWeight: 700 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: "bold",
        },
      },
    },
  },
});

export default theme;
