import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import toast from 'react-hot-toast';

// Iconos
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// Layout
import AdminLayout from '@/layouts/AdminLayout';

// Componentes propios
import Title from '@/components/common/Title';
import Text from '@/components/common/Text';
import MainButton from '@/components/common/MainButton';
import Collapsable from '@/components/common/Collapsable';
import EmployeeHeader from '@/components/collapsable/Header/EmployeeHeader';
import EmployeeBody from '@/components/collapsable/Body/EmployeeBody';
import EmployeeForm from '@/components/employees/EmployeeForm';

// Fotos prueba
import avatar1 from '@/assets/dummy/perfil-1.jpg';
import avatar2 from '@/assets/dummy/perfil-2.jpg';

// <----------- DUMMY DATA ----------->

// Lista de servicios
const dummyServicios = [
  'Corte de cabello',
  'Tinte y luces',
  'Manicura Spa',
  'Pedicura Spa',
  'Maquillaje profesional',
];

// Lista de empleados
const dummyEmpleados = [
  {
    id: 1,
    name: 'Martha Garza',
    email: 'martha.grz@correo.com',
    phone: '81 1234 5678',
    birthdate: '2026-02-11',
    info: 'Especialista en servicios de belleza con 5 años de experiencia.',
    foto: avatar1,
    schedule:
      'Lunes: 08:00 - 20:00\nMartes: 08:00 - 20:00\nMiércoles: 08:00 - 20:00\nJueves: 08:00 - 20:00\nViernes: 08:00 - 20:00\nSábado: 13:00 - 17:00\nDomingo: Descanso',
    services: [dummyServicios[0], dummyServicios[1], dummyServicios[4]],
  },
  {
    id: 2,
    name: 'Roberto Rodríguez',
    email: 'roberto.r@correo.com',
    phone: '81 8765 4321',
    birthdate: '1998-05-15',
    info: 'Atención al cliente y gestión de citas.',
    foto: avatar2,
    schedule:
      'Lunes: 09:00 - 18:00\nMartes: 09:00 - 18:00\nMiércoles: 09:00 - 18:00\nJueves: 09:00 - 18:00\nViernes: 09:00 - 18:00\nSábado: 09:00 - 18:00\nDomingo: Descanso',
    services: [dummyServicios[2], dummyServicios[3]],
  },
  {
    id: 3,
    name: 'Marcela López',
    email: 'marcela.l@correo.com',
    phone: '81 2345 6789',
    birthdate: '1995-08-20',
    info: 'Experta en cuidado de la piel y tratamientos faciales. Siempre dispuesta a brindar el mejor servicio a sus clientes.',
    foto: avatar1,
    schedule:
      'Lunes: 10:00 - 19:00\nMartes: 10:00 - 19:00\nMiércoles: Descanso\nJueves: 10:00 - 19:00\nViernes: 10:00 - 19:00\nSábado: 10:00 - 15:00pm\nDomingo: Descanso',
    services: [dummyServicios[2], dummyServicios[3], dummyServicios[4]],
  },
  {
    id: 4,
    name: 'Pedro Sánchez',
    email: 'pedro.s@correo.com',
    phone: '81 3456 7890',
    birthdate: '1992-11-10',
    info: 'Especialista en cortes modernos y estilismo para todo tipo de eventos sociales y casuales.',
    foto: avatar2,
    schedule:
      'Lunes: Descanso\nMartes: 08:00 - 17:00pm\nMiércoles: 08:00 - 17:00pm\nJueves: 08:00 - 17:00pm\nViernes: 08:00 - 17:00pm\nSábado: 08:00 - 17:00pm\nDomingo: 09:00 - 14:00pm',
    services: [dummyServicios[0], dummyServicios[1]],
  },
];

// <----------- LOGICA ----------->
const Employees = () => {
  // Estados
  const [busqueda, setBusqueda] = useState('');
  const [empleadoEditando, setEmpleadoEditando] = useState(null);

  // Funcion busqueda empleado
  const empleadosFiltrados = dummyEmpleados.filter((emp) =>
    emp.name.toLowerCase().includes(busqueda.toLowerCase()),
  );

  // Funcion guardar empleado
  const handleSaveEmployee = (employeeData) => {
    const isNew = employeeData.id === 'nuevo';

    toast.success(
      isNew
        ? 'Empleado agregado exitosamente.'
        : 'Datos del empleado actualizados.',
      {
        id: 'employee-save-toast',
        duration: 3000,
        style: {
          borderRadius: '10px',
          background: '#1b1c37',
          color: '#fff',
          border: '1px solid #4caf50',
        },
        iconTheme: {
          primary: '#4caf50',
          secondary: '#fff',
        },
      },
    );

    setEmpleadoEditando(null);
  };

  return (
    <AdminLayout>
      <Box
        sx={{
          p: { xs: 2, md: 5 },
          width: '100%',
          maxWidth: '1000px',
          mx: 'auto',
        }}
      >
        {/* Vista datos empleado / Vista lista empleado */}
        {empleadoEditando ? (
          // Agregar / Editar empleado
          <Box>
            {/* Boton de regreso y titulo */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 4,
                borderBottom: '2px solid rgba(255,255,255,0.1)',
                pb: 2,
              }}
            >
              {/* Flecha */}
              <IconButton
                onClick={() => setEmpleadoEditando(null)}
                sx={{
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                  width: 40,
                  height: 40,
                }}
              >
                <ArrowBackIcon />
              </IconButton>
              {/* Titulo */}
              <Box
                sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}
              >
                <Title
                  children={
                    empleadoEditando.id === 'nuevo'
                      ? 'Agregar empleado'
                      : 'Editar empleado'
                  }
                  size={{ xs: '1.8rem', md: '2.2rem' }}
                  color='white'
                  align='center'
                />
              </Box>

              <Box sx={{ width: 40, flexShrink: 0 }} />
            </Box>

            {/* Componente del formulario */}
            <EmployeeForm
              employee={empleadoEditando}
              onCancel={() => setEmpleadoEditando(null)}
              onSave={handleSaveEmployee}
            />
          </Box>
        ) : (
          // Lista de empleados
          <Box>
            {/* Titulo y boton agregar empleado */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'center', md: 'center' },
                gap: 2,
                mb: 4,
                width: '100%',
              }}
            >
              {/* Titulo */}
              <Box
                sx={{ flexGrow: 1, textAlign: { xs: 'center', md: 'left' } }}
              >
                <Title
                  children='Gestión de empleados'
                  size={{ xs: '1.8rem', md: '2.2rem' }}
                  color='white'
                  align={{ xs: 'center', md: 'left' }}
                />
              </Box>
              {/* Boton agregar empleado */}
              <MainButton
                size={{ xs: '14px', md: '16px' }}
                onClick={() => setEmpleadoEditando({ id: 'nuevo' })}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonAddIcon fontSize='small' />
                  Agregar empleado
                </Box>
              </MainButton>
            </Box>

            {/* Buscar empleado */}
            <TextField
              fullWidth
              placeholder='Buscar empleado por nombre...'
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              sx={{
                mb: 4,
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  background:
                    'linear-gradient(180deg, #2c2e5b 0%, #1c1e51d3 100%)',
                  borderRadius: '50px',
                  fontFamily: "'Montserrat', sans-serif",
                  '& fieldset': { border: 'none' },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Lista de Empleados */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {empleadosFiltrados.length > 0 ? (
                empleadosFiltrados.map((empleado) => (
                  <Collapsable
                    key={empleado.id}
                    headerContent={<EmployeeHeader employee={empleado} />}
                  >
                    <EmployeeBody
                      employee={empleado}
                      onEdit={setEmpleadoEditando}
                    />
                  </Collapsable>
                ))
              ) : (
                <Text
                  children='No se encontraron empleados con ese nombre.'
                  color='rgba(255,255,255,0.5)'
                  align='center'
                />
              )}
            </Box>
          </Box>
        )}
      </Box>
    </AdminLayout>
  );
};

export default Employees;
