/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import { React, useRef, useState } from 'react';

import Link from 'next/link';

import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
    padding: ${theme.spacing(0, 0.5)};
    height: ${theme.spacing(6)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${theme.palette.secondary.light}
`
);

function HeaderUserbox({ business }) {
  const { firstName, lastName, businessName, avatar } = business;
  const name = `${firstName} ${lastName}`;

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
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar
          variant="rounded"
          alt={name}
          src={avatar === undefined ? firstName[0] : avatar}
        />
        <Box
          component="span"
          sx={{
            display: { xs: 'none', md: 'inline-block' },
          }}
        >
          <UserBoxText>
            <UserBoxLabel variant="body1">{name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {businessName}
            </UserBoxDescription>
          </UserBoxText>
        </Box>
        <Box
          component="span"
          sx={{
            display: { xs: 'none', sm: 'inline-block' },
          }}
        >
          <ExpandMoreTwoToneIcon
            sx={{
              ml: 1,
            }}
          />
        </Box>
      </UserBoxButton>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuUserBox
          sx={{
            minWidth: 210,
          }}
          display="flex"
        >
          <Avatar
            variant="rounded"
            alt={name}
            src={avatar === undefined ? firstName[0] : avatar}
          />
          <UserBoxText>
            <UserBoxLabel variant="body1">{name}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {businessName}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider
          sx={{
            mb: 0,
          }}
        />
        <List
          sx={{
            p: 1,
          }}
          component="nav"
        >
          <Link href={`/dashboards/business/${business._id}`} passHref>
            <ListItem
              onClick={() => {
                handleClose();
              }}
              button
            >
              <ManageAccountsTwoToneIcon fontSize="small" />
              <ListItemText primary="Profile" />
            </ListItem>
          </Link>
          <Link
            href={`/dashboards/business/postedJobs/${business._id}`}
            passHref
          >
            <ListItem
              onClick={() => {
                handleClose();
              }}
              button
            >
              <WorkTwoToneIcon fontSize="small" />
              <ListItemText primary="Posted Jobs" />
            </ListItem>
          </Link>
          <Link href={`/dashboards/business/postAJob/${business._id}`} passHref>
            <ListItem
              onClick={() => {
                handleClose();
              }}
              button
            >
              <PostAddTwoToneIcon fontSize="small" />
              <ListItemText primary="Post A Job" />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Popover>
    </>
  );
}

HeaderUserbox.propTypes = {
  business: PropTypes.object.isRequired,
};

export default HeaderUserbox;
