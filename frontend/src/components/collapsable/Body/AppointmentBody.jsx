import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Title from '@/components/common/Title'
import Text from '@/components/common/Text'
import BaseDialog from '@/components/common/BaseDialog'
import SimpleInfoDisplay from '@/components/common/SimpleInfoDisplay';
import MainButton from '@/components/common/MainButton';
import CloseIcon from '@mui/icons-material/CloseRounded';
import AdvertismentIcon from '@mui/icons-material/ReportProblemOutlined';

const AppointmentBody = ({appointment, onConfirmCancel}) => 
{
    const linearDegraded= 'linear-gradient(180deg, #11122b 0%, #1c1e51d3 100%)';
    const [openCancelDialog, setOpenCancelDialog] = React.useState(false);
    const handleOpenCancelDialog = () => { setOpenCancelDialog(true);};
    const handleCloseCancelDialog = (hasAccepted) => 
    {
        setOpenCancelDialog(false);
        if(hasAccepted) onConfirmCancel();
    };
    
    return(
    <>
        <Box 
            sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                mt: 0, 
                px: { xs: 1, md: 2 }, 
                width: '100%',
                flexWrap: 'nowrap' 
            }}
        >
            {/* Contenedor del Empleado */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
                <Text children='Atiende:' fontWeight={'700'} size={16} />
                
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                    <Avatar src={appointment.employ.pfp} sx={{ width: { xs: 32, md: 40 }, height: { xs: 32, md: 40 } }} />
                    <Text 
                        children={appointment.employ.name} 
                        size={14} 
                        sx={{ 
                            whiteSpace: 'nowrap', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis', 
                            maxWidth: { xs: '110px', sm: '150px', md: 'none' } 
                        }} 
                    />
                </Box>
            </Box>

            {/* Contenedor del Estado */}
            <Box sx={{ flexShrink: 0 }}>
                <SimpleInfoDisplay 
                    title='Estado: ' 
                    text={appointment.status.name} 
                    width='fit-content' 
                    hasIcon={true} 
                    icon={appointment.status.icon} 
                    flexDirection={{xs:'column', md:'row'}} 
                />
            </Box>
        </Box>

        {/* Datos del Cliente */}
        <Box sx={{p:{xs:0, md:2}, mt: 2}}>
            <Title children={'Datos del Cliente'} size={'16'} />
            <Box sx={{background: linearDegraded, p:3, m:1, borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: 3}}>
                <Grid container spacing={{xs:2, md:5}}>
                    <Grid size={{xs: 12, md: 9}}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Text children='Nombre Completo' color='primary.main' size='16' fontWeight='bold' />
                            <SimpleInfoDisplay title={appointment.client.name}/>
                        </Box>
                    </Grid>
                    <Grid size={{xs: 12, md: 3}}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Text children='Edad' color='primary.main' size='16' fontWeight='bold' />
                            <SimpleInfoDisplay title={appointment.client.age}/>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={{xs:2, md:5}}>
                    <Grid size={{xs: 12, md: 5}}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Text children='Sexo' color='primary.main' size='16' fontWeight='bold' />
                            <SimpleInfoDisplay title={appointment.client.gender}/>
                        </Box>
                    </Grid>
                    <Grid size={{xs: 12, md: 7}}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Text children='Correo electrónico' color='primary.main' size='16' fontWeight='bold' />
                            <SimpleInfoDisplay title={appointment.client.mail}/>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container spacing={{xs:2, md:5}} sx={{display: 'flex', alignItems: 'flex-end'}}>
                    <Grid size={{xs: 12, md: 6}}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                            <Text children='Número telefónico' color='primary.main' size='16' fontWeight='bold' />
                            <SimpleInfoDisplay title={appointment.client.phoneNumber}/>
                        </Box>
                    </Grid>
                    {/* Cancelar cita */}
                    <Grid size={{xs: 12, md: 6}}>
                        <Box sx={{display: 'flex', justifyContent: {xs: 'center', md: 'flex-end'} }}>
                            <MainButton size={{xs:'12px', md:'16px'}} onClick={handleOpenCancelDialog} ><CloseIcon /> Cancelar cita</MainButton>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <BaseDialog
                id="cancel-appointment"
                open={openCancelDialog}
                onClose={handleCloseCancelDialog}
                title={"Advertencia"}
                icon={<AdvertismentIcon/>}
                content={"Está a punto de cancelar una cita, ¿desea continuar?"}
            />
        </Box>
    </>
    )
}
export default AppointmentBody;