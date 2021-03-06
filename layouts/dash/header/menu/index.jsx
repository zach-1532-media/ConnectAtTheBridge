import { React, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';

import Link from '../../../../components/shared/myLink';

const ListWrapper = styled(Box)(
  ({ theme }) => `
          .MuiTouchRipple-root {
              display: none;
          }
          
          .MuiListItem-root {
              transition: ${theme.transitions.create(['color', 'fill'])};
              
              &.MuiListItem-indicators {
                  padding: ${theme.spacing(1, 2)};
              
                  .MuiListItemText-root {
                      .MuiTypography-root {
                          &:before {
                              height: 4px;
                              width: 22px;
                              opacity: 0;
                              visibility: hidden;
                              display: block;
                              position: absolute;
                              bottom: -10px;
                              transition: all .2s;
                              border-radius: ${theme.general.borderRadiusLg};
                              content: "";
                              background: ${theme.colors.primary.main};
                          }
                      }
                  }
  
                  &.active,
                  &:active,
                  &:hover {
                  
                      background: transparent;
                  
                      .MuiListItemText-root {
                          .MuiTypography-root {
                              &:before {
                                  opacity: 1;
                                  visibility: visible;
                                  bottom: 0px;
                              }
                          }
                      }
                  }
              }
          }
  `
);

function HeaderMenu() {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <ListWrapper>
        <List disablePadding component={Box} display="flex">
          <ListItem classes={{ root: 'MuiListItem-indicators' }} button>
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Users"
            />
          </ListItem>
          <ListItem classes={{ root: 'MuiListItem-indicators' }} button>
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Banking"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            ref={ref}
            onClick={handleOpen}
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={
                <Box display="flex" alignItems="center">
                  Help
                  <Box display="flex" alignItems="center" pl={0.3}>
                    <ExpandMoreTwoToneIcon fontSize="small" />
                  </Box>
                </Box>
              }
            />
          </ListItem>
        </List>
      </ListWrapper>
      <Menu
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
      >
        <MenuItem component={Link} href="/">
          Features tour
        </MenuItem>
        <MenuItem component={Link} href="/docs">
          Getting started guide
        </MenuItem>
        <MenuItem component={Link} href="/docs/contact-support">
          Contact support
        </MenuItem>
      </Menu>
    </>
  );
}

export default HeaderMenu;
