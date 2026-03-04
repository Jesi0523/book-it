import * as React from 'react';
import { useTheme, Box } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Avatar from '@mui/material/Avatar';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function getStyles(name, labelName, theme) 
{
  return {
    fontWeight: labelName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}


const Combobox = ({ name, size = '16px', array, hasImage = false}) =>
{
    const theme = useTheme();
    const [labelName, setLabelName] = React.useState([]);

    const handleChange = (event) => 
    {
        const { target: { value } } = event;
        setLabelName(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <FormControl sx={{ m: 1, width: '100%' }}>
          <InputLabel id="label" sx={{ color: 'primary.main', fontSize: size }}>{name}</InputLabel>
          <Select
            labelId="label"
            id="select"
            value={labelName}
            onChange={handleChange}
            input={<OutlinedInput label={name} />} 
            MenuProps=
            {{
                PaperProps: 
                {
                    style: { maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, width: 250,},
                    sx: 
                    {
                        background: 'linear-gradient(180deg, #05061b 100%, #a0a3de 0%)',
                        color: 'text.primary',
                    
                        '& .MuiMenuItem-root': { fontSize: size},
                    
                        '& .MuiMenuItem-root:hover': { backgroundColor: 'rgba(12, 6, 74, 0.7)'},
                    
                        '& .MuiMenuItem-root.Mui-selected': 
                        {
                            backgroundColor: 'rgb(11, 8, 47) !important',
                            color: 'white'
                        },
                    
                        '& .MuiMenuItem-root.Mui-selected:hover': { backgroundColor: 'rgb(12, 6, 74) !important'}
                    }
                }
            }}
            sx=
            {{ 
                background: 'linear-gradient(180deg, #2c2e5b 0%, #13154d 100%)',
                '& .MuiSelect-select': { backgroundColor: 'transparent !important', color: 'text.primary', fontSize: size },
                '.MuiSvgIcon-root': { fill: 'orange !important' },
                '.MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' }
            }}
        >
            {array.map((element) => 
            {
                const valor = hasImage ? element.name : element;
                const photo = hasImage ? element.pfp : null;
    
                return (
                    <MenuItem
                        key={valor}
                        value={valor}
                        style={getStyles(valor, labelName, theme)}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1.5 }} >
                            { hasImage && ( <Avatar alt={valor} src={photo} sx={{ width: 24, height: 24 }} />)}
                            {valor}
                        </Box>
                    </MenuItem>
                );
            }
            )}
        </Select>
    </FormControl>
  );
}

export default Combobox;