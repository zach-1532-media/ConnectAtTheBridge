/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
import { React, useContext } from 'react';
import { useRouter } from 'next/router';

import NextLink from 'next/link';

import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import { Button, ListItem } from '@mui/material';

import { SidebarContext } from '../../../../../components/contexts/sidebar';

const SidebarMenuItem = ({ link, icon: Icon, active, name, ...rest }) => {
  const { closeSidebar } = useContext(SidebarContext);

  const theme = useTheme();

  const router = useRouter();

  const currentLink = router.asPath;

  return (
    <ListItem component="div" key={name} {...rest}>
      <NextLink href={link} passHref>
        <Button
          disableRipple
          onClick={closeSidebar}
          startIcon={Icon && <Icon />}
          color={link === currentLink ? 'primary' : 'inherit'}
          sx={{
            color: theme.sidebar.textColor,
            '&:hover': {
              background: 'transparent',
              color: theme.colors.primary.main,
            },
          }}
        >
          {name}
        </Button>
      </NextLink>
    </ListItem>
  );
};

SidebarMenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  active: PropTypes.bool,
  link: PropTypes.string,
  icon: PropTypes.elementType,
  badge: PropTypes.string,
  badgeTooltip: PropTypes.string,
  open: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

SidebarMenuItem.defaultProps = {
  open: false,
  active: false,
};

export default SidebarMenuItem;
