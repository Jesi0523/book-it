import React, { useState } from 'react';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';

// Componentes propios
import Title from '@/components/common/Title';
import SuspensionForm from '@/components/suspensions/SuspensionForm';
import SuspensionList from '@/components/suspensions/SuspensionList';

// <---------- DUMMY DATA ---------->
const dummyEmpleados = [
  { id: 'todos', nombre: 'Todos los empleados' },
  { id: 1, nombre: 'Martha Garza' },
  { id: 2, nombre: 'Roberto Rodríguez' },
];

const dummySuspensiones = [
  { id: 1, texto: 'Lunes 16 de febrero 2026 de 8:00 a 14:00' },
  { id: 2, texto: 'Martes 17 de febrero 2026 de 10:00 a 12:00' },
  { id: 3, texto: 'Miércoles 18 de febrero 2026 (Todo el día)' },
];

const Suspensions = () => {
  // <------------- ESTADOS ------------->
  const [fechaSeleccionada, setFechaSeleccionada] = useState(dayjs());
  const [tipoSuspension, setTipoSuspension] = useState('horario');
  const [horaInicio, setHoraInicio] = useState('07:00');
  const [horaFin, setHoraFin] = useState('12:00');
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState('todos');
  const [mesFiltro, setMesFiltro] = useState('Febrero');
  const [anioFiltro, setAnioFiltro] = useState(2026);
  const [listaSuspensiones, setListaSuspensiones] = useState(dummySuspensiones);

  // <------------- FUNCIONES ------------->
  const handleAplicar = () => {
    console.log('Aplicando suspensión:', {
      fecha: fechaSeleccionada.format('YYYY-MM-DD'),
      tipo: tipoSuspension,
      inicio: tipoSuspension === 'horario' ? horaInicio : null,
      fin: tipoSuspension === 'horario' ? horaFin : null,
      empleado: empleadoSeleccionado,
    });
  };

  const handleEliminarSuspension = (id) => {
    setListaSuspensiones((prev) => prev.filter((susp) => susp.id !== id));
  };

  // Estilos globales de los selects
  const selectMenuProps = {
    PaperProps: {
      sx: {
        backgroundColor: '#1b1c37',
        color: 'white',
        '& .MuiMenuItem-root:hover': {
          backgroundColor: 'rgba(255, 183, 77, 0.2)',
        },
        '& .Mui-selected': {
          backgroundColor: 'rgba(255, 183, 77, 0.4) !important',
        },
      },
    },
  };

  const selectEstilos = {
    backgroundColor: '#1b1c37',
    color: 'white',
    borderRadius: '8px',
    height: '45px',
    '& fieldset': { border: 'none' },
    '& .MuiSvgIcon-root': { color: '#ffb74d' },
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 5 },
        width: '100%',
        maxWidth: '900px',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      <Title
        children='SUSPENSIÓN DE SERVICIOS'
        size={{ xs: '2rem', md: '2.6rem' }}
        color='white'
        align='center'
      />

      {/* Crear suspension */}
      <SuspensionForm
        fechaSeleccionada={fechaSeleccionada}
        setFechaSeleccionada={setFechaSeleccionada}
        tipoSuspension={tipoSuspension}
        setTipoSuspension={setTipoSuspension}
        horaInicio={horaInicio}
        setHoraInicio={setHoraInicio}
        horaFin={horaFin}
        setHoraFin={setHoraFin}
        empleadoSeleccionado={empleadoSeleccionado}
        setEmpleadoSeleccionado={setEmpleadoSeleccionado}
        dummyEmpleados={dummyEmpleados}
        handleAplicar={handleAplicar}
        selectMenuProps={selectMenuProps}
        selectEstilos={selectEstilos}
      />

      {/* Lista */}
      <SuspensionList
        mesFiltro={mesFiltro}
        setMesFiltro={setMesFiltro}
        anioFiltro={anioFiltro}
        listaSuspensiones={listaSuspensiones}
        handleEliminarSuspension={handleEliminarSuspension}
        selectMenuProps={selectMenuProps}
        selectEstilos={selectEstilos}
      />
    </Box>
  );
};

export default Suspensions;
