import {Box} from '@mui/material'
import Text from '@/components/common/Text'

const SimpleInfoDisplay = 
({
    hasIcon='false',
    text='', title='', 
    icon, titleSize='16', textSize='16',
    titleColor= 'text.primary',
    textColor='primary.main',
    weightFont = '400',
    align='start', width='100%',
    background= 'linear-gradient(180deg, #2c2e5b 0%, #1c1e51d3 100%)',
    border='1.5px solid #2c2e5bba'}) =>
{

    const iconDisplay = hasIcon ? icon : '';
    return(
        <Box sx=
        {{
            display: 'flex', flexDirection:'row', alignItems: 'center', justifyContent: 'center', gap: 1,
            background: background, border: border,
            width: width, borderRadius: '10px', p:1
        }}>
           {iconDisplay} 
            <Text children={title} size={titleSize} fontWeight={weightFont} color={titleColor} align={align} />
            <Text children={text} color={textColor} size={textSize} align={align}/>
        </Box>
    )
}
export default SimpleInfoDisplay;