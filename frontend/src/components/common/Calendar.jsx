import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function Calendar() {
  const colorBorder = '2px solid #2c2e5bba';
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        sx={{
          // Fondo y Contenedor
          background: 'linear-gradient(180deg, #2c2e5b 0%, #13154d 100%)',
          borderRadius: '15px',
          border: colorBorder,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',

          // Mes y flechas
          '& .MuiPickersCalendarHeader-root': {
            color: 'white',
          },
          '& .MuiIconButton-root': {
            color: 'white',
          },

          // Letras de los dias
          '& .MuiDayCalendar-weekDayLabel': {
            color: '#a0a3de',
            fontWeight: 'bold',
          },

          // Numeros de los dias
          '& .MuiPickersDay-root': {
            color: 'white',
            fontSize: '1rem',
          },

          // Dia seleccionado
          '& .MuiPickersDay-root.Mui-selected': {
            backgroundColor: '#ffb74d !important',
            color: '#13154d',
            fontWeight: 'bold',
          },
          '& .MuiPickersDay-root.Mui-selected:hover': {
            backgroundColor: '#ffa726 !important',
          },

          // El dia actual
          '& .MuiPickersDay-today': {
            borderColor: '#ffb74d !important',
          },
        }}
      />
    </LocalizationProvider>
  );
}
