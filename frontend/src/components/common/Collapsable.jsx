import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Cambiamos "title" por "headerContent"
const Collapsable = ({ headerContent, children,
    background='linear-gradient(180deg, #2c2e5b 0%, #1c1e51d3 100%)', 
    backgroundSecondary ='linear-gradient(180deg, #000114c2 0%, #0e0f30 100%)'}) => 
{
  return (
    <Accordion sx={{ background: background, color: 'white', mb: 2 }}>
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