/* eslint-disable react/prop-types */
import React from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Test = ({ openBackdrop }) => (
  <Backdrop
    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    open={openBackdrop}
  >
    <CircularProgress color="inherit" />
  </Backdrop>
);

export default Test;
