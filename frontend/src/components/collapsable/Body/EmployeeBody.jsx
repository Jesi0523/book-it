import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';

// Componentes propios
import Text from '@/components/common/Text';
import SimpleInfoDisplay from '@/components/common/SimpleInfoDisplay';
import MainButton from '@/components/common/MainButton';

const EmployeeBody = ({ employee, onEdit }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}
    >
      {/* Fecha de nacimiento y telefono */}
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Text
              children='Fecha de nacimiento'
              color='primary.main'
              size='16px'
              align='center'
            />
            <SimpleInfoDisplay
              title={employee.birthdate}
              titleColor='white'
              titleSize={{ xs: '16px', md: '16px' }}
              align='center'
              border='none'
            />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Text
              children='Número telefónico'
              color='primary.main'
              size='16px'
              align='center'
            />
            <SimpleInfoDisplay
              title={employee.phone}
              titleColor='white'
              titleSize={{ xs: '16px', md: '16px' }}
              align='center'
              border='none'
            />
          </Box>
        </Grid>
      </Grid>

      {/* Informacion y horarios */}
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              height: '100%',
            }}
          >
            <Text
              children='Información'
              color='primary.main'
              size='16px'
              align='center'
            />
            <Box
              sx={{
                background: (theme) => theme.customGradients.searchBar,
                borderRadius: '16px',
                p: 3,
                width: '100%',
                height: '100%',
                minHeight: '170px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                children={employee.info}
                color='white'
                size='14px'
                align='center'
              />
            </Box>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              height: '100%',
            }}
          >
            <Text
              children='Horarios'
              color='primary.main'
              size='16px'
              align='center'
            />
            <Box
              sx={{
                background: (theme) => theme.customGradients.searchBar,
                borderRadius: '16px',
                p: 3,
                width: '100%',
                height: '100%',
                minHeight: '170px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {employee.schedule.split('\n').map((linea, index) => (
                <Text
                  key={index}
                  children={linea}
                  color='white'
                  size='14px'
                  align='center'
                />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Servicios */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          width: '100%',
        }}
      >
        <Text
          children='Servicios'
          color='primary.main'
          size='16px'
          align='center'
        />
        <Box
          sx={{
            background: (theme) => theme.customGradients.searchBar,
            borderRadius: '16px',
            p: 2,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Text
            children={employee.services.join(' • ')}
            color='white'
            size='14px'
            align='center'
          />
        </Box>
      </Box>

      {/* Boton editar */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <MainButton
          size={{ xs: '14px', md: '16px' }}
          onClick={() => onEdit(employee)}
          sx={{
            backgroundColor: 'primary.light',
            display: 'flex',
            gap: 1,
            alignItems: 'center',
          }}
        >
          <EditIcon fontSize='small' /> Editar información
        </MainButton>
      </Box>
    </Box>
  );
};

export default EmployeeBody;
