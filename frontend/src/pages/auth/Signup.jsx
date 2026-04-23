// React
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// Constantes
import { ROUTES } from '@/constants/routes';

// MUI
import { useTheme } from '@mui/material/styles';
import MuiLink from '@mui/material/Link';
import Box from '@mui/material/Box';

// <--------------- Componentes --------------->

// Common
import Card from '@/components/common/Card';
import Title from '@/components/common/Title';
import Text from '@/components/common/Text';
import MainButton from '@/components/common/MainButton';
import InfoDialog from '@/components/common/InfoDialog';

// Form
import TextInput from '@/components/form/TextInput';
import PasswordInput from '@/components/form/PasswordInput';
import GenderSelect from '@/components/form/GenderSelect';
import DateInput from '@/components/form/DateInput';

function Signup() {
  // <--------------- CONTEXTO --------------->
  const theme = useTheme();
  const navigate = useNavigate();

  // <--------------- ESTADOS --------------->
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false); // Estado del dialogo

  // <--------------- FUNCIONES --------------->

  // Funcion boton registrar
  const handleSignup = () => {
    setIsSuccessDialogOpen(true);
  };

  // Funcion dialogo
  const handleCloseDialog = () => {
    setIsSuccessDialogOpen(false);
  };

  // Funcion redirigir a login
  const handleNavigation = () => {
    navigate(ROUTES.PUBLIC.LOGIN);
  };

  // <--------------- RENDER --------------->
  return (
    <>
      <Card
        bg={theme.customGradients.mainBackground}
        brRadius='12px'
        showShadow={true}
        offset={12}
      >
        {/* Titulo y descripcion */}
        <Title>BIENVENIDO.</Title>
        <Text size={20}>Regístrate para comenzar</Text>

        {/* Nombre */}
        <TextInput type='text' label='Nombre' placeholder='Ejemplo' />

        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            width: '100%',
          }}
        >
          {/* Genero */}
          <Box sx={{ flex: 0.35 }}>
            <GenderSelect height='80px' />
          </Box>

          {/* Telefono */}
          <Box sx={{ flex: 0.65 }}>
            <TextInput
              type='number'
              label='Teléfono'
              placeholder='Ejemplo'
              height='80px'
            />
          </Box>
        </Box>

        {/* Correo */}
        <TextInput
          type='email'
          label='Correo electrónico'
          placeholder='ejemplo@gmail.com'
        />

        {/* Fecha de nacimiento */}
        <DateInput />

        {/* Contrasena */}
        <PasswordInput />

        {/* Confirmar contrasena */}
        <PasswordInput label='Confirmar Contraseña' />

        {/* Boton registrar */}
        <MainButton size={20} onClick={handleSignup}>
          Regístrate
        </MainButton>

        {/* Redirigir login */}
        <Text align='center'>
          ¿Ya tienes una cuenta?{' '}
          <MuiLink
            component={RouterLink}
            to={ROUTES.PUBLIC.LOGIN}
            sx={{
              color: 'primary.main',
              fontWeight: 'bold',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              '&:hover': {
                textDecoration: 'underline',
                color: 'primary.light',
              },
            }}
          >
            Inicia Sesión
          </MuiLink>
        </Text>
      </Card>

      {/* Dialogo inmediato */}
      <InfoDialog
        open={isSuccessDialogOpen}
        onClose={handleCloseDialog}
        onTransitionExited={handleNavigation}
        title='¡Registro Exitoso!'
        content='Tu cuenta ha sido creada.'
      />
    </>
  );
}

export default Signup;
