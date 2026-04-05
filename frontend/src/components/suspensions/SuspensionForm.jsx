import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

// Componentes propios
import Text from '@/components/common/Text';
import MainButton from '@/components/common/MainButton';
import Calendar from '@/components/common/Calendar';

// Iconos
import CheckIcon from '@mui/icons-material/Check';

const SuspensionForm = ({
  fechaSeleccionada, setFechaSeleccionada,
  tipoSuspension, setTipoSuspension,
  horaInicio, setHoraInicio,
  horaFin, setHoraFin,
  empleadoSeleccionado, setEmpleadoSeleccionado,
  dummyEmpleados, handleAplicar,
  selectMenuProps, selectEstilos
}) => {
  return (
    <Box sx={{ border: '1px solid #787ff6', borderRadius: '16px', p: { xs: 2, md: 4 } }}>
      <Text children="Registrar suspensión:" color="#ffb74d" size="22" sx={{ mb: 2, display: 'block' }} />

      <Grid container spacing={4} alignItems="center">
        
        {/* Seccion izquierda */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
          <Box> 
            <Calendar value={fechaSeleccionada} onChange={(newValue) => setFechaSeleccionada(newValue)} />
          </Box>
        </Grid>

        {/* Seccion derecha */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: 3, 
            width: '100%',
            maxWidth: '400px', 
            mx: { xs: 'auto', md: 0 }, 
          }}>
            
            {/* Tipo de suspension */}
            <Select
              value={tipoSuspension}
              onChange={(e) => setTipoSuspension(e.target.value)}
              MenuProps={selectMenuProps}
              sx={selectEstilos}
            >
              <MenuItem value="horario">Seleccionar horario</MenuItem>
              <MenuItem value="todo_dia">Todo el día</MenuItem>
            </Select>

            {/* Rango de horas */}
            {tipoSuspension === 'horario' && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TextField
                  type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)}
                  size="small"
                  sx={{
                    flex: 1, backgroundColor: '#1b1c37', borderRadius: '8px',
                    '& input': { color: 'white', padding: '10px', textAlign: 'center' },
                    '& fieldset': { border: 'none' },
                    '& input::-webkit-calendar-picker-indicator': { filter: 'invert(1)' },
                  }}
                />
                <Text children="hasta" color="white" size="14px" />
                <TextField
                  type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)}
                  size="small"
                  sx={{
                    flex: 1, backgroundColor: '#1b1c37', borderRadius: '8px',
                    '& input': { color: 'white', padding: '10px', textAlign: 'center' },
                    '& fieldset': { border: 'none' },
                    '& input::-webkit-calendar-picker-indicator': { filter: 'invert(1)' },
                  }}
                />
              </Box>
            )}

            {/* Seleccionar empleado */}
            <Select
              value={empleadoSeleccionado}
              onChange={(e) => setEmpleadoSeleccionado(e.target.value)}
              MenuProps={selectMenuProps}
              sx={selectEstilos}
            >
              {dummyEmpleados.map(emp => (
                <MenuItem key={emp.id} value={emp.id}>{emp.nombre}</MenuItem>
              ))}
            </Select>

            {/* Boton aplicar */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
              <MainButton size="16px" onClick={handleAplicar} sx={{ backgroundColor: '#ffb74d', color: '#000', px: 4, display: 'flex', gap: 1 }}>
                <CheckIcon fontSize="small" /> Aplicar
              </MainButton>
            </Box>

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SuspensionForm;