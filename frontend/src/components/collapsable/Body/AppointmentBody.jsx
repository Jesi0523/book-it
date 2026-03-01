import {Grid, Box, Avatar} from '@mui/material'
import Title from '@/components/common/Title'
import Text from '@/components/common/Text'
import SimpleInfoDisplay from '@/components/common/SimpleInfoDisplay';
import MainButton from '@/components/common/MainButton';
import CloseIcon from '@mui/icons-material/CloseRounded';

const AppointmentBody = ({status, employ, client}) =>
{
    const linearDegraded= 'linear-gradient(180deg, #11122b 0%, #1c1e51d3 100%)';
    return(
    <>
        <Grid container sx={{display: 'flex', alignItems: 'center'}}>
            <Grid size={9} sx={{px: 2, display: 'flex', flexDirection:{xs:'column', md:'row'}, alignItems: {xs:'start', md:'center'}}}>
                <Text children='Atiende: ' fontWeight={'700'} size={16}/>
                <Box sx={{display: 'flex', flexDirection:'row', alignItems: 'center', gap: 1, px:2}}>
                    <Avatar src={employ.pfp}/>
                    <Text children={employ.name} size={14}/>
                </Box>
            </Grid>
            <Grid size={3}>
                <SimpleInfoDisplay title='Estado: ' text={status.name} width='fit-content' hasIcon={true} icon={status.icon} flexDirection={{xs:'column', md:'row'}} />
            </Grid>
        </Grid>

        <Box sx={{p:{xs:0, md:2}}}>
            <Title children={'Datos del Cliente'} size={'16'} />
            <Box sx={{background: linearDegraded, p:3, m:1, borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: 2}}>
                <Grid container spacing={{xs:1, md:5}}>
                    <Grid size={9}><SimpleInfoDisplay title={client.name}/></Grid>
                    <Grid size={3}><SimpleInfoDisplay title={client.age}/></Grid>
                </Grid>

                <Grid container spacing={{xs:1, md:5}}>
                    <Grid size={5}> <SimpleInfoDisplay title={client.gender}/></Grid>
                    <Grid size={7} ><SimpleInfoDisplay title={client.mail}/></Grid>
                </Grid>
                <Grid container spacing={{xs:1, md:5}} sx={{display: 'flex', alignItems: 'center'}}>
                    <Grid size={6}> <SimpleInfoDisplay title={client.phoneNumber}/></Grid>
                    <Grid size={6}>
                        <Box sx={{display: 'flex', justifyContent: 'center'}}>
                            <MainButton size={{xs:'12px', md:'16px'}}>Cancelar<CloseIcon></CloseIcon></MainButton>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    </>
    )
}
export default AppointmentBody