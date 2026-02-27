import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as MuiLink } from "@mui/material";

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

function Login() {
  return (
    <AuthLayout>
      <Card
        bg="linear-gradient(180deg, #0c0c18 0%, #060511 100%)"
        brRadius="12px"
        showShadow={true}
      >
        <Title>Bienvenido de vuelta</Title>
        <Text size={20}>Inicia sesión para continuar</Text>

        <TextInput
          type="email"
          label="Correo electrónico"
          placeholder="ejemplo@gmail.com"
        />
        <PasswordInput />

        <MainButton size={20}>Iniciar sesión</MainButton>

        <Text align="center">
          ¿No tienes una cuenta?{" "}
          <MuiLink
            component={RouterLink}
            to="/signup"
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
            Regístrate
          </MuiLink>
        </Text>
      </Card>
    </AuthLayout>
  );
}

export default Login;
