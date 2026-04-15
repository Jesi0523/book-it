import React from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// Componentes propios
import Text from '@/components/common/Text';
import MainButton from '@/components/common/MainButton';
import Calendar from '@/components/common/Calendar';
import BaseDialog from '@/components/common/BaseDialog';
// Iconos
import CheckIcon from '@mui/icons-material/Check';
import AdvertismentIcon from '@mui/icons-material/ReportProblemOutlined';

// <---------- Funcion ---------->
const opcionesTiempo = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2)
    .toString()
    .padStart(2, '0');
  const m = i % 2 === 0 ? '00' : '30';
  return `${h}:${m}`;
});

const SuspensionForm = ({
  fechaSeleccionada,
  setFechaSeleccionada,
  tipoSuspension,
  setTipoSuspension,
  horaInicio,
  setHoraInicio,
  horaFin,
  setHoraFin,
  empleadoSeleccionado,
  setEmpleadoSeleccionado,
  dummyEmpleados,
  handleAplicar,
  selectMenuProps,
  selectEstilos,
}) => {
  const [openSaveDialog, setOpenSaveDialog] = React.useState(false);
  const handleOpenSaveDialog = () => { setOpenSaveDialog(true);};
  const handleCloseSaveDialog = (hasAccepted) => 
  {
    setOpenSaveDialog(false);
    if(hasAccepted){{handleAplicar}}
  }; 
 
  return (
    <Box
      sx={{
        border: '1px solid #787ff6',
        borderRadius: '16px',
        p: { xs: 2, md: 4 },
      }}
    >
      <Text
        children='Registrar suspensión:'
        color='#ffb74d'
        size='22'
        sx={{ mb: { xs: 3, md: 4 }, display: 'block' }}
      />

      {/* Contenedor calendario y formulario */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-around',
          gap: { xs: 4, md: 6 },
          width: '100%',
        }}
      >
        {/* Seccion calendario */}
        <Box sx={{ flexShrink: 0, display: 'flex', justifyContent: 'center' }}>
          <Calendar
            value={fechaSeleccionada}
            onChange={(newValue) => setFechaSeleccionada(newValue)}
          />
        </Box>

        {/* Seccion formulario */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 3,
            width: '100%',
            maxWidth: '400px',
          }}
        >
          {/* Tipo de suspension */}
          <Select
            value={tipoSuspension}
            onChange={(e) => setTipoSuspension(e.target.value)}
            MenuProps={selectMenuProps}
            sx={selectEstilos}
          >
            <MenuItem value='horario'>Seleccionar horario</MenuItem>
            <MenuItem value='todo_dia'>Todo el día</MenuItem>
          </Select>

          {/* Rango de horas 24 horas */}
          {tipoSuspension === 'horario' && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
              }}
            >
              {/* Hora inicio */}
              <Select
                value={horaInicio}
                onChange={(e) => setHoraInicio(e.target.value)}
                size='small'
                MenuProps={selectMenuProps}
                sx={{
                  flex: 1,
                  backgroundColor: '#1b1c37',
                  borderRadius: '8px',
                  color: 'white',
                  '& fieldset': { border: 'none' },
                  '& .MuiSelect-select': {
                    padding: '10px',
                    textAlign: 'center',
                  },
                  '& .MuiSvgIcon-root': { color: '#ffb74d' },
                }}
              >
                {opcionesTiempo.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>

              <Text children='hasta' color='white' size='14px' />

              {/* Hora fin */}
              <Select
                value={horaFin}
                onChange={(e) => setHoraFin(e.target.value)}
                size='small'
                MenuProps={selectMenuProps}
                sx={{
                  flex: 1,
                  backgroundColor: '#1b1c37',
                  borderRadius: '8px',
                  color: 'white',
                  '& fieldset': { border: 'none' },
                  '& .MuiSelect-select': {
                    padding: '10px',
                    textAlign: 'center',
                  },
                  '& .MuiSvgIcon-root': { color: '#ffb74d' },
                }}
              >
                {opcionesTiempo.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          )}

          {/* Seleccionar empleado */}
          <Select
            value={empleadoSeleccionado}
            onChange={(e) => setEmpleadoSeleccionado(e.target.value)}
            MenuProps={selectMenuProps}
            sx={selectEstilos}
          >
            {dummyEmpleados.map((emp) => (
              <MenuItem key={emp.id} value={emp.id}>
                {emp.nombre}
              </MenuItem>
            ))}
          </Select>

          {/* Boton aplicar */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
            <MainButton
              size='16px'
              onClick={handleOpenSaveDialog} 
              sx={{
                backgroundColor: '#ffb74d',
                color: '#000',
                px: 4,
                display: 'flex',
                gap: 1,
              }}
            >
              <CheckIcon fontSize='small' /> Aplicar
            </MainButton>
          </Box>
        </Box>
      </Box>
      <BaseDialog
        id="save-suspension-data"
        open={openSaveDialog}
        onClose={handleCloseSaveDialog}
        title={"Atención"}
        icon={<AdvertismentIcon/>}
        content={
        <> Está a punto de añadir una suspensión. Si hay citas programadas, serán canceladas. <br/> <b>¿Desea continuar?</b></>}
      />
    </Box>
  );
};

export default SuspensionForm;
