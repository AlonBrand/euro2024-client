import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

export default function BetsModal(props) {
  const { open, onClose, modalContent } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent >
          {modalContent}
        </DialogContent>
        <DialogActions >
          <Button style={{
            margin: 'auto', // Align center horizontally
            display: 'block', // Ensure it takes the full width
            fontSize: '1.2rem', // Increase font size
          }} onClick={onClose} autoFocus >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}