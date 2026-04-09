// *************************************************************************************************
// NOTA: Este solo es el cáscaron del colapsable, como cada colapsable tiene una estructura distinta
// entonces decidí manejar la estructura del header y body en archivos separados que están en la 
// carpeta de collapsable.
// *************************************************************************************************

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Collapsable = ({ headerContent, children,
    background='linear-gradient(180deg, #2c2e5b 0%, #1c1e51d3 100%)', 
    backgroundSecondary ='linear-gradient(180deg, #000114c2 0%, #0e0f30 100%)'}) => 
{
  return (
    <Accordion sx={{ background: background, color: 'white', mb: 2, p:0}}>
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'primary.main'}}/>}>
        {headerContent}
      </AccordionSummary>
      
      <AccordionDetails sx={{ background: backgroundSecondary, p: 3 }}>
        {children}
      </AccordionDetails>
    </Accordion>
  );
};

export default Collapsable;