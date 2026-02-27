import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Link as MuiLink, Grid, Box } from "@mui/material";

import AuthLayout from "@/layouts/AuthLayout";

// <---- Componentes ---->
// Common
import Card from "@/components/common/Card";
import Title from "@/components/common/Title";
import Text from "@/components/common/Text";
import MainButton from "@/components/common/MainButton";

// Formulario
import TextInput from "@/components/formulario/TextInput";
import PasswordInput from "@/components/formulario/PasswordInput";
import GenderSelect from "@/components/formulario/GenderSelect";
import DateInput from "@/components/formulario/DateInput";

function Signup() {
  const navigate = useNavigate();

  const handleContinue = () => {
    // Aquí puedes agregar validaciones de los campos más adelante
    navigate("/");
  };

  return (
    <AuthLayout>
      <Card
        bg="linear-gradient(180deg, #0c0c18 0%, #060511 100%)"
        brRadius="12px"
        showShadow={true}
        offset={12}
      >
        <Title>BIENVENIDO.</Title>
        <Text size={20}>Regístrate para comenzar</Text>

        <TextInput type="text" label="Nombre" placeholder="Ejemplo" />

        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            width: "100%",
          }}
        >
          <Box sx={{ flex: 0.35 }}>
            <GenderSelect />
          </Box>

          <Box sx={{ flex: 0.65 }}>
            <TextInput
              type="number"
              label="Teléfono"
              placeholder="Ejemplo"
              height="80px"
            />
          </Box>
        </Box>

        <TextInput
          type="email"
          label="Correo electrónico"
          placeholder="ejemplo@gmail.com"
        />

        <DateInput />

        <PasswordInput />
        <PasswordInput label="Confirmar Contraseña" />

        <MainButton size={20} onClick={handleContinue}>
          Regístrate
        </MainButton>

        <Text align="center">
          ¿Ya tienes una cuenta?{" "}
          <MuiLink
            component={RouterLink}
            to="/"
            sx={{
              color: "primary.main",
              fontWeight: "bold",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
                color: "primary.light",
              },
            }}
          >
            Inicia Sesión
          </MuiLink>
        </Text>
      </Card>
    </AuthLayout>
  );
}

export default Signup;
