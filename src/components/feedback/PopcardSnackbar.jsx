import { useState } from 'react';
import {
  Snackbar,
  Alert,
} from '@mui/material';
import PropTypes from 'prop-types';

const PopcardSnackbar = (props) => {
  const {
    message,
    severity,
    doubleMargin,
    tripleMargin
  } = props;

  const [open, setOpen] = useState(message === "Please authenticate" ? false : true);

  const handleClose = () => {
    setOpen(false)
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      style={{ marginBottom: tripleMargin ? '110px' : doubleMargin ? '55px' : '0' }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

PopcardSnackbar.propTypes = {
  onClose: PropTypes.func,
  message: PropTypes.string,
  severity: PropTypes.string,
  doubleMargin: PropTypes.bool,
  tripleMargin: PropTypes.bool,
}

export default PopcardSnackbar;