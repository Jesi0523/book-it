import Grid from '@mui/material/Grid';
import Title from '@/components/common/Title'
import Text from '@/components/common/Text'
import SimpleInfoDisplay from '@/components/common/SimpleInfoDisplay';

const AppointmentHeader = ({title, date, price}) =>
{
    return(
        <Grid container sx={{width: '100%', px:1, py:0}}>
            <Grid size={8}>
                <Title children={title} size={{xs:'0.8rem', md:'1.3rem'}} color={'text.primary'}/>
                <Text children={date} size={{xs:'0.5rem', md:'0.9rem'}} color={'primary.main'}/>
            </Grid>
            <Grid size={4} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <SimpleInfoDisplay title='Costo:' text={price} align='center' width='fit-content'
                    textWeight='700' titleSize={{xs:'0.7rem', md:'1rem'}} textColor='secondary.blueShade' 
                    background='linear-gradient(180deg, #4e5082 0%, #3b3d75d3 100%)'/>
            </Grid>
        </Grid>
    )
}

export default AppointmentHeader;