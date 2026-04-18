// *************************************************************************************************
// NOTA: Este solo es el cáscaron del colapsable, como cada colapsable tiene una estructura distinta
// entonces decidí manejar la estructura del header y body en archivos separados que están en la
// carpeta de collapsable.
// *************************************************************************************************

import { useTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Collapsable = ({
  headerContent,
  children,
  background,
  backgroundSecondary,
}) => {
  const theme = useTheme();

  return (
    <Accordion
      sx={{
        background: background || theme.customGradients.collapsableHeader,
        color: 'white',
        mb: 2,
        p: 0,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main' }} />}
      >
        {headerContent}
      </AccordionSummary>

      <AccordionDetails
        sx={{
          background:
            backgroundSecondary || theme.customGradients.collapsableDetails,
          p: 3,
        }}
      >
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default Collapsable;
