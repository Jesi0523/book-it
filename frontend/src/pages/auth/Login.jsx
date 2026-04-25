// React
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// MUI
import { useTheme } from '@mui/material/styles';
import MuiLink from '@mui/material/Link';

// <--------------- Componentes --------------->

// Common
import Card from '@/components/common/Card';
import Title from '@/components/common/Title';
import Text from '@/components/common/Text';
import MainButton from '@/components/common/MainButton';

// Form
import TextInput from '@/components/form/TextInput';
import PasswordInput from '@/components/form/PasswordInput';

function Login() {
  // <--------------- CONTEXTO --------------->
  const theme = useTheme();
  const navigate = useNavigate();

  // <--------------- ESTADOS --------------->
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // <--------------- FUNCIONES --------------->

  // Funcion boton login
  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'admin@gmail.com' && password === '1234') {
      navigate('/admin/appointment-calendar');
    } else {
      navigate('/main');
    }
  };

  // <--------------- RENDER --------------->
  return (
    <Card
      bg={theme.customGradients.mainBackground}
      brRadius='12px'
      showShadow={true}
    >
      {/* Titulo y descripcion */}
      <Title>Bienvenido de vuelta</Title>
      <Text size={20}>Inicia sesión para continuar</Text>

      {/* Correo */}
      <TextInput
        type='email'
        label='Correo electrónico'
        placeholder='ejemplo@gmail.com'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Contrasena */}
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Boton login */}
      <MainButton size={20} onClick={handleLogin}>
        Iniciar sesión
      </MainButton>

      {/* Redirigir signup */}
      <Text align='center'>
        ¿No tienes una cuenta?{' '}
        <MuiLink
          component={RouterLink}
          to='/signup'
          sx={{
            color: 'primary.main',
            fontWeight: 'bold',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
              color: 'primary.light',
            },
          }}
        >
          Regístrate
        </MuiLink>
      </Text>
    </Card>
  );
}

export default Login;
