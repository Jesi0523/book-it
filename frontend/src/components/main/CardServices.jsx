import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const CardServices = ({image, name, description}) =>
{
  return (
    <Card sx={{ maxWidth: 275, background: 'none', border:'0px', display: 'flex', flexDirection: 'column',  justifyContent: 'center' }}>
      <CardMedia
        sx={{ width: 140, height: 140,  borderRadius: '100%'}}
        image={image}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
            {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'primary.main', fontSize: 12, textAlign: 'justify' }}>
            {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardServices;
