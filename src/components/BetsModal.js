import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function BetsModal(props) {
  const {open, onClose, modalTitle, modalContent} = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Button variant="outlined">{modalTitle}</Button>
        <DialogTitle id="responsive-dialog-title" style={{"textAlign":"center"}}>
          {modalTitle}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText> */}
           {modalContent}
          {/* </DialogContentText> */}
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