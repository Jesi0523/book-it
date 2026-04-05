import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';

// Componentes propios
import Text from '@/components/common/Text';

const EmployeeHeader = ({ employee }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', px: 1 }}>
      <Avatar src={employee.foto} sx={{ width: 60, height: 60 }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Text children={employee.name} color='white' size='22px' />
        <Text children={employee.email} color='primary.main' size='14px' fontWeight='bold' />
      </Box>
    </Box>
  );
};

export default EmployeeHeader;