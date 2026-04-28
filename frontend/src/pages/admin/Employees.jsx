// React
import React, { useState, useEffect } from 'react';

// API
import { getEmpleadosAdmin } from '@/api/empleados.api';
import { getServicios } from '@/api/servicios.api';

// Utils
import { toastSuccess, toastError } from '@/utils/notify';

// MUI
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

// Iconos
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

// Componentes propios
import Title from '@/components/common/Title';
import Text from '@/components/common/Text';
import MainButton from '@/components/common/MainButton';
import Collapsable from '@/components/common/Collapsable';
import EmployeeHeader from '@/components/collapsable/Header/EmployeeHeader';
import EmployeeBody from '@/components/collapsable/Body/EmployeeBody';
import EmployeeForm from '@/components/employees/EmployeeForm';
import Loader from '@/components/common/Loader';

const Employees = () => {
  // <--------------- ESTADOS --------------->
  const [busqueda, setBusqueda] = useState('');
  const [empleadoEditando, setEmpleadoEditando] = useState(null);
  const [empleados, setEmpleados] = useState([]);
  const [listaServicios, setListaServicios] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [serverError, setServerError] = useState(false);

  // <--------------- DERIVADOS --------------->
  // GET empleados
  const fetchEmpleados = async () => {
    try {
      setIsLoadingData(true);
      setServerError(false);
      setBusqueda('');

      const [empleadosData, serviciosData] = await Promise.all([
        getEmpleadosAdmin(),
        getServicios(),
      ]);

      if (empleadosData.ok) setEmpleados(empleadosData.empleados);
      if (serviciosData.ok) setListaServicios(serviciosData.servicios);
    } catch (error) {
      setServerError(true);
      setEmpleados([]);
      toastError(
        typeof error === 'string' ? error : 'Error al cargar los empleados.',
        'get-empleados',
      );
    } finally {
      setIsLoadingData(false);
    }
  };

  // Busqueda de empleado
  const empleadosFiltrados = empleados.filter((emp) =>
    emp.nombre.toLowerCase().includes(busqueda.toLowerCase()),
  );

  // <--------------- EFFECTS --------------->
  // GET Empleados al cargar la página
  useEffect(() => {
    fetchEmpleados();
  }, []);

  // Scroll hacia arriba al cambiar de lista/datos empleado
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [empleadoEditando]);

  // <--------------- FUNCIONES --------------->

  // Funcion guardar empleado
  const handleSaveEmployee = (employeeData) => {
    const isNew = employeeData.id === 'nuevo';
    toastSuccess(
      isNew
        ? 'Empleado agregado exitosamente.'
        : 'Datos del empleado actualizados correctamente.',
      'employee-save-toast',
    );

    setEmpleadoEditando(null);
  };

  // <--------------- RENDER --------------->
  if (isLoadingData) return <Loader height='100%' />;

  return (
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
                backgroundColor: 'background.hoverLighter',
                '&:hover': { backgroundColor: 'background.hoverLight' },
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
            <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Title
                children='Gestión de empleados'
                size={{ xs: '1.8rem', md: '2.2rem' }}
                color='white'
                align={{ xs: 'center', md: 'left' }}
              />
            </Box>
            {/* Boton agregar empleado */}
            {!serverError && (
              <MainButton
                size={{ xs: '14px', md: '16px' }}
                onClick={() => setEmpleadoEditando({ id: 'nuevo' })}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PersonAddIcon fontSize='small' />
                  Agregar empleado
                </Box>
              </MainButton>
            )}
          </Box>

          {/* Buscar empleado */}
          <TextField
            fullWidth
            placeholder='Busca un empleado por su nombre'
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            sx={{
              mb: 4,
              '& .MuiOutlinedInput-root': {
                color: 'white',
                background: (theme) => theme.customGradients.searchBar,
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
            {/* Validamos si hay error, si está vacío o si no hay resultados */}
            {empleados.length === 0 ? (
              <Text
                children='No tienes empleados registrados.'
                color='text.disabled'
                align='center'
              />
            ) : empleadosFiltrados.length > 0 ? (
              empleadosFiltrados.map((empleado) => (
                <Collapsable
                  key={empleado._id}
                  headerContent={<EmployeeHeader employee={empleado} />}
                >
                  {/* Todavía nos falta actualizar el Body, le pasamos la data real */}
                  <EmployeeBody
                    employee={empleado}
                    onEdit={setEmpleadoEditando}
                    listaServicios={listaServicios}
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
  );
};;

export default Employees;
