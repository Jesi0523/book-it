import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import MuiLink from '@mui/material/Link';

import AuthLayout from '@/layouts/AuthLayout';

// <---- Componentes ---->

// Common
import Card from '@/components/common/Card';
import Title from '@/components/common/Title';
import Text from '@/components/common/Text';
import MainButton from '@/components/common/MainButton';

// Formulario
import TextInput from '@/components/form/TextInput';
import PasswordInput from '@/components/form/PasswordInput';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'admin@gmail.com' && password === '1234') {
      navigate('/admin/appointment-calendar');
    } else {
      navigate('/main');
    }
  };

  return (
    <AuthLayout>
      <Card
        bg='linear-gradient(180deg, #0c0c18 0%, #060511 100%)'
        brRadius='12px'
        showShadow={true}
      >
        <Title>Bienvenido de vuelta</Title>
        <Text size={20}>Inicia sesión para continuar</Text>

        <TextInput
          type='email'
          label='Correo electrónico'
          placeholder='ejemplo@gmail.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <MainButton size={20} onClick={handleLogin}>
          Iniciar sesión
        </MainButton>

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
    </AuthLayout>
  );
}

export default Login;
