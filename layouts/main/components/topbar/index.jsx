import React from 'react';

import Link from 'next/link';

import { useSession } from 'next-auth/client';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { alpha, useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';

import NavItem from './navItem';
import Logo from '../../../../components/shared/logo';

const Topbar = ({ onSidebarOpen, colorInvert = false }) => {
  const theme = useTheme();
  const [session] = useSession();

  const initial = !session ? null : session.user.email.slice(0, 1);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 1,
      }}
    >
      <Logo />
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
        <Box>
          <NavItem
            title="Jobs"
            id="job-page"
            colorInvert={colorInvert}
            href="/jobs"
          />
        </Box>
        <Box marginLeft={4}>
          <NavItem
            title="Blog"
            id="blog"
            href="/blog"
            colorInvert={colorInvert}
          />
        </Box>
        {session ? (
          <></>
        ) : (
          <Box marginLeft={4}>
            <NavItem
              title="Looking to hire?"
              href="/businesses"
              id="business-signup"
              colorInvert={colorInvert}
            />
          </Box>
        )}
        <Box marginLeft={4}>
          {!session ? (
            <Link href="/users" passHref>
              <Button variant="contained" color="primary" size="large">
                Sign In
              </Button>
            </Link>
          ) : (
            <Link href={`/${session.user.email}`} passHref>
              <Avatar
                sx={{
                  bgcolor: 'secondary.main',
                  '&:hover': { cursor: 'pointer' },
                }}
              >
                {initial}
              </Avatar>
            </Link>
          )}
        </Box>
      </Box>
      <Box sx={{ display: { xs: 'block', md: 'none' }, alignItems: 'center' }}>
        <Button
          onClick={() => onSidebarOpen()}
          aria-label="Menu"
          variant="outlined"
          sx={{
            borderRadius: 2,
            minWidth: 'auto',
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func.isRequired,
  colorInvert: PropTypes.bool,
};

Topbar.defaultProps = {
  colorInvert: false,
};

export default Topbar;
