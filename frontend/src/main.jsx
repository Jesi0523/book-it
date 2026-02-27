import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import theme from "./theme/theme";
import "@/styles/global.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}> {/* Son estilos del MUI para toda la app */}
        <CssBaseline /> {/* Es el normalize pero de MUI */}
          <Toaster position="top-right" /> {/* Para notificaciones chidas */}
          <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
)
