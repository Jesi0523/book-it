import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/ClearRounded';
import ContinueIcon from '@mui/icons-material/CheckRounded';

function BaseDialog({onClose, open, title,icon,content,...other}) 
{
    const linearDegraded= 'linear-gradient(180deg, #2c2e69 0%, #2d2e5c 100%)';

    const handleCancel = () => { onClose(false);};

    const handleOk = () => { onClose(true);};

    return (
        <Dialog
            sx={{ 
                '& .MuiDialog-paper': 
                {   width: '80%', maxHeight: 435,
                    background: linearDegraded,
                } 

            }}
            maxWidth="xs"
            open={open}
            {...other}
        >
            <DialogTitle 
                sx={{
                    display: 'flex', alignItems: 'center', gap: 1,
                    fontWeight: '400', fontSize: 16,
                    color: 'text.secondary'
                }}
            >
                {icon}{title}
            </DialogTitle>
      <DialogContent dividers
        sx={{
                fontWeight: '400', textAlign: 'center', fontSize: 20,
                color: 'text.primary'
        }}
      >
        {content}
      </DialogContent>
      <DialogActions sx={{mx:1}}> 
        <Button onClick={handleCancel}>
            <CloseIcon />Cancelar
        </Button>
        <Button onClick={handleOk}>
            <ContinueIcon />Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

BaseDialog.propTypes = 
{
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default BaseDialog;
