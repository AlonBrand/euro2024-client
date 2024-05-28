import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function Modal(props) {
  const theme = useTheme();
  const {open, setOpen, onClose, modalTitle, modalText} = props;

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  return (
    <div>
      <Dialog
        // fullScreen={fullScreen}
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" style={{"textAlign":"center"}}>
          {modalTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
           {modalText}
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <Button onClick={onClose} autoFocus >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}