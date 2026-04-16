import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import toast from 'react-hot-toast';

// Iconos
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';

// Componentes propios
import Title from '@/components/common/Title';
import Text from '@/components/common/Text';
import MainButton from '@/components/common/MainButton';
import Collapsable from '@/components/common/Collapsable';
import ServiceHeader from '@/components/collapsable/Header/ServiceHeader';
import ServiceBody from '@/components/collapsable/Body/ServiceBody';
import ServiceForm from '@/components/services/ServiceForm';

// Fotos prueba
import img1 from '@/assets/dummy/servicio-1.webp';
import img2 from '@/assets/dummy/servicio-2.webp';
import img3 from '@/assets/dummy/servicio-3.webp';

// <----------- DUMMY DATA ----------->

// Servicios
const dummyServicios = [
  {
    id: 1,
    nombre: 'Corte de dama',
    precio: '$350.00 MXN',
    descripcion:
      'Corte de cabello personalizado según las facciones del cliente. Incluye lavado, secado y estilizado básico.',
    tiempo: '30 minutos',
    imagen: img1,
  },
  {
    id: 2,
    nombre: 'Tinte y luces',
    precio: '$1,200.00 MXN',
    descripcion:
      'Aplicación de tinte base y luces para iluminar el rostro. Se utilizan productos de alta calidad para proteger el cabello.',
    tiempo: '60 minutos',
    imagen: img2,
  },
  {
    id: 3,
    nombre: 'Manicura Spa',
    precio: '$250.00 MXN',
    descripcion:
      'Limpieza profunda, exfoliación, masaje relajante en manos y esmaltado tradicional.',
    tiempo: '30 minutos',
    imagen: img3,
  },
];

const Services = () => {
  //   Estados
  const [busqueda, setBusqueda] = useState('');
  const [servicioEditando, setServicioEditando] = useState(null);
  const [services, setServices] = React.useState(dummyServicios);

  const serviciosFiltrados = services.filter((serv) =>
    serv.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  // Funcion eliminar servicio
  const handleDelete = (index) => {
    const updatedServices = services.filter((service) => service.id !== index);
    setServices(updatedServices);

    toast.success('Servicio eliminado del catálogo.', {
      id: 'service-delete-toast',
      duration: 3000,
      style: {
        borderRadius: '10px',
        background: '#1b1c37',
        color: '#fff',
        border: '1px solid #757575',
      },
      iconTheme: {
        primary: '#757575',
        secondary: '#fff',
      },
    });
  };

  // Funcion guardar servicio
  const handleSaveService = (serviceData) => {
    console.log('Guardando servicio:', serviceData);
    setServicioEditando(null);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 5 },
        width: '100%',
        maxWidth: '1000px',
        mx: 'auto',
      }}
    >
      {/* Vista datos servicio / Vista lista servicios */}
      {servicioEditando ? (
        // Vista datos servicio
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
            {/* Boton regreso */}
            <IconButton
              onClick={() => setServicioEditando(null)}
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
                  servicioEditando.id === 'nuevo'
                    ? 'Agregar servicio'
                    : 'Editar servicio'
                }
                size={{ xs: '1.8rem', md: '2.2rem' }}
                color='white'
                align='center'
              />
            </Box>

            <Box sx={{ width: 40, flexShrink: 0 }} />
          </Box>

          {/* Formulario */}
          <Box sx={{ mt: 5 }}>
            <ServiceForm
              service={servicioEditando}
              onCancel={() => setServicioEditando(null)}
              onSave={handleSaveService}
              isEditing={servicioEditando.id === 'nuevo' ? true : false}
            />
          </Box>
        </Box>
      ) : (
        // Vista de la lista de servicios
        <Box>
          {/* Titulo y boton agregar servicio */}
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
            <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Title
                children='Gestión de servicios'
                size={{ xs: '1.8rem', md: '2.5rem' }}
                color='white'
                align={{ xs: 'center', md: 'left' }}
              />
            </Box>

            {/* Agregar servicio */}
            <MainButton
              size={{ xs: '14px', md: '16px' }}
              onClick={() => setServicioEditando({ id: 'nuevo' })}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AddIcon fontSize='small' /> Agregar servicio
              </Box>
            </MainButton>
          </Box>

          {/* Buscar servicio */}
          <TextField
            fullWidth
            placeholder='Buscar servicio por nombre...'
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

          {/* Lista de servicios */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {serviciosFiltrados.length > 0 ? (
              serviciosFiltrados.map((servicio) => (
                <Collapsable
                  key={servicio.id}
                  headerContent={<ServiceHeader service={servicio} />}
                >
                  <ServiceBody
                    service={servicio}
                    onEdit={setServicioEditando}
                    onDeleteConfirm={() => handleDelete(servicio.id)}
                  />
                </Collapsable>
              ))
            ) : (
              <Text
                children='No se encontraron servicios con ese nombre.'
                color='rgba(255,255,255,0.5)'
                align='center'
              />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Services;
