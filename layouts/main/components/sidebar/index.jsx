import React from 'react';

import PropTypes from 'prop-types';

import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

import SidebarNav from './components/sidebarNav';

const Sidebar = ({ open, variant, onClose }) => (
  <Drawer
    anchor="left"
    onClose={() => onClose()}
    open={open}
    variant={variant}
    sx={{
      '& .MuiPaper-root': {
        width: '100%',
        maxWidth: 280,
      },
    }}
  >
    <Box
      sx={{
        height: '100%',
        padding: 1,
      }}
    >
      <SidebarNav />
    </Box>
  </Drawer>
);

Sidebar.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
