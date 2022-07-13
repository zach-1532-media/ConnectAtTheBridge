/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import Link from 'next/link';

import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import JobCard from '../../../shared/jobCard';
import {
  ListingQuickView,
  ListingQuickViewHeader,
  ListingQuickViewBody,
  ListingQuickViewList,
  ListingQuickViewButton,
} from '../../../shared/listingQuickView';

const JobBlock = ({ jobs }) => {
  const jobsSlice = jobs.slice(0, 9);

  const isJobsPage = true;

  const theme = useTheme();

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontWeight: 700, color: theme.palette.text.secondary }}
        >
          Top jobs listed in our portal
        </Typography>
      </Box>
      <Divider gutterBottom sx={{ marginY: 4 }} />
      <Grid container spacing={4}>
        {jobsSlice.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job._id}>
            <Box
              display="block"
              width={1}
              height={1}
              sx={{
                textDecoration: 'none',
                transition: 'all .2s ease-in-out',
                '&:hover': {
                  transform: `translateY(-${theme.spacing(1 / 2)})`,
                },
              }}
            >
              <JobCard
                job={job}
                height={1}
                width={1}
                key={job._id}
                isJobsPage={isJobsPage}
              >
                <ListingQuickView>
                  <ListingQuickViewHeader job={job}>
                    <ListingQuickViewButton link={`/jobListing/${job._id}`}>
                      Expand
                    </ListingQuickViewButton>
                    <ListingQuickViewButton variant="outlined">
                      Refer a friend
                    </ListingQuickViewButton>
                  </ListingQuickViewHeader>
                  <Divider sx={{ marginY: 4 }} />
                  <ListingQuickViewBody job={job} search>
                    <ListingQuickViewList
                      title="Primary Responsibilities"
                      job={job}
                    />
                    <ListingQuickViewList title="Qualifications" job={job} />
                  </ListingQuickViewBody>
                </ListingQuickView>
              </JobCard>
            </Box>
          </Grid>
        ))}
        <Grid item container justifyContent="center" xs={12}>
          <Link href="/jobSearch" passHref>
            <Button
              variant="contained"
              size="large"
              endIcon={
                <Box
                  component="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width={24}
                  height={24}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </Box>
              }
            >
              View all
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

JobBlock.propTypes = {
  jobs: PropTypes.object.isRequired,
};

export default JobBlock;
