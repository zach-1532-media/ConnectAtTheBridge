import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const Hero = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

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
          <Box data-aos={isMd ? 'fade-right' : 'fade-up'} marginBottom={4}>
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
            <Box marginBottom={3}>
              <Typography variant="h6" component="span" color="text.secondary">
                We use individuallized data points that only match you with what
                fits your needs
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'stretched', sm: 'flex-start' }}
            >
              <Link href="/jobSearch/all" passHref>
                <Box
                  component={Button}
                  variant="contained"
                  color="primary"
                  size="large"
                  fullWidth={!isMd}
                >
                  Explore
                </Box>
              </Link>
            </Box>
          </Box>
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
              >
                <Image
                  alt="applicant looking at themselves in the mirror"
                  src="https://connectatthebridge.nyc3.cdn.digitaloceanspaces.com/site-assets/career.svg"
                  height={600}
                  width={700}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
