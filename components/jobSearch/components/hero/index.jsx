import React from 'react';

import PropTypes from 'prop-types';

import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import SearchBar from '../../../shared/searchbar';

const Hero = ({ search, setSearch }) => {
  const theme = useTheme();

  return (
    <Box bgcolor="alternate.main" padding={{ xs: 2, md: 4 }} borderRadius={2}>
      <Grid container spacing={4}>
        <Grid
          item
          container
          xs={12}
          md={6}
          alignItems="center"
          sx={{ position: 'relative' }}
        >
          <Box marginBottom={4}>
            <Box marginBottom={2}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 700,
                }}
              >
                Find your dream job
              </Typography>
            </Box>
          </Box>
          <SearchBar search={search} setSearch={setSearch} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box height={1} width={1} display="flex" justifyContent="center">
            <Box
              height={1}
              width={1}
              maxWidth={{ xs: 600, md: '100%' }}
              maxHeight={500}
            >
              <Box
                sx={{
                  filter:
                    theme.palette.mode === 'dark' ? 'brightness(0.8)' : 'none',
                }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

Hero.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default Hero;
