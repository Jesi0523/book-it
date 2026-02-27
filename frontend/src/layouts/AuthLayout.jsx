import { Box } from "@mui/material";
import img from "@/assets/bg_auth.png";
import logo from "@/assets/Logo1.png";

const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        // USAMOS 100% EN LUGAR DE 100VW: 
        // 100% se ajusta al contenedor padre y descuenta el ancho de la scrollbar vertical.
        width: "100%", 

        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: "repeat(12, 1fr)",
        },
        alignItems: "center",

        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backgroundBlendMode: "darken",

        // Consolidamos el padding para evitar que empuje el layout hacia afuera
        p: { xs: 2, md: 4 }, 
        boxSizing: "border-box", // Asegura que el padding no sume al ancho total
      }}
    >
      {/* Logo: Solo visible de MD en adelante */}
      <Box
        component="img"
        src={logo}
        alt="Book IT! Logo"
        sx={{
          position: "absolute",
          top: { xs: 20, md: 40 },
          right: { xs: 20, md: 60 },
          width: { xs: "80px", md: "120px" },
          height: "auto",
          zIndex: 10,
          // Lógica responsiva: oculto en xs, bloque en md
          display: { xs: "none", md: "block" }, 
        }}
      />

      <Box
        sx={{
          gridColumn: {
            xs: "1",
            md: "2 / span 5",
            lg: "2 / span 4",
          },
          zIndex: 5,
          display: "flex",
          justifyContent: "flex-start", 
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "450px" }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;