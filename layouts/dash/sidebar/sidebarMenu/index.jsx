/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';

import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {
      margin-bottom: ${theme.spacing(1.5)};
      padding: 0;
  
      & > .MuiList-root {
        padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
      }
    }
  
      .MuiListSubheader-root {
        text-transform: uppercase;
        font-weight: bold;
        font-size: ${theme.typography.pxToRem(12)};
        color: ${theme.sidebar.menuItemIconColor};
        padding: ${theme.spacing(1, 3.5)};
        line-height: 1.4;
      }
  `
);

const SidebarMenu = ({ business }) => {
  const theme = useTheme();

  const router = useRouter();

  const menuItems = [
    {
      name: 'Profile',
      link: `/dashboards/business/${business._id}`,
      icon: <ManageAccountsTwoToneIcon />,
    },
    {
      name: 'Posted Jobs',
      link: `/dashboards/business/postedJobs/${business._id}`,
      icon: <WorkTwoToneIcon />,
    },
    {
      name: 'Post a Job',
      link: `/dashboards/business/postAJob/${business._id}`,
      icon: <PostAddTwoToneIcon />,
    },
  ];

  return (
    <>
      {menuItems.map((item) => (
        <MenuWrapper key={item.name}>
          <List>
            <Link href={item.link} passHref>
              <ListItem>
                <Link href={item.link} passHref>
                  <Button
                    disableRipple
                    fullWidth
                    startIcon={item.icon}
                    variant={router.asPath === item.link ? 'outlined' : 'text'}
                    color="tertiary"
                    sx={{
                      justifyContent: 'stretch',
                      color: theme.sidebar.textColor,
                      '&:hover': {
                        background: 'transparent',
                        color: theme.colors.primary.main,
                      },
                    }}
                  >
                    {item.name}
                  </Button>
                </Link>
              </ListItem>
            </Link>
          </List>
        </MenuWrapper>
      ))}
    </>
  );
};

SidebarMenu.propTypes = {
  business: PropTypes.object.isRequired,
};

export default SidebarMenu;
