import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function Calendar({ value, onChange }) {
  const colorBorder = '2px solid #2c2e5bba';
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        value={value}
        onChange={onChange}
        sx={{
          background: 'linear-gradient(180deg, #2c2e5b 0%, #13154d 100%)',
          borderRadius: '15px',
          border: colorBorder,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)',

          '& .MuiPickersCalendarHeader-root': { color: 'white' },
          '& .MuiIconButton-root': { color: 'white' },
          '& .MuiDayCalendar-weekDayLabel': { color: '#a0a3de', fontWeight: 'bold' },
          '& .MuiPickersDay-root': { color: 'white', fontSize: '1rem' },
          '& .MuiPickersDay-root.Mui-selected': {
            backgroundColor: '#ffb74d !important',
            color: '#13154d',
            fontWeight: 'bold',
          },
          '& .MuiPickersDay-root.Mui-selected:hover': {
            backgroundColor: '#ffa726 !important',
          },
          '& .MuiPickersDay-today': {
            borderColor: '#ffb74d !important',
          },
        }}
      />
    </LocalizationProvider>
  );
}