/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import { React, useState } from 'react';

import PropTypes from 'prop-types';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

import PagiAndPerPage from '../../../../../shared/pagiAndPerPage';
import usePagination from '../../../../../../lib/Pagination';
import JobCard from '../../../../../shared/jobCard';
import {
  ListingQuickView,
  ListingQuickViewHeader,
  ListingQuickViewBody,
  ListingQuickViewList,
  ListingQuickViewButton,
} from '../../../../../shared/listingQuickView';

const ActivePosts = ({ jobs, business }) => {
  const [cardsPerPage, setCardsPerPage] = useState(9);

  const _DATA = usePagination(jobs, cardsPerPage);

  const theme = useTheme();

  return (
    <Grid container spacing={4}>
      {_DATA.currentData().map((job) => (
        <Grid item xs={12} sm={6} md={4} key={job.job}>
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
            <JobCard job={job} business={business} height={1} width={1}>
              <ListingQuickView>
                <ListingQuickViewHeader job={job}>
                  <ListingQuickViewButton>Apply</ListingQuickViewButton>
                  <ListingQuickViewButton variant="outlined">
                    Refer a friend
                  </ListingQuickViewButton>
                </ListingQuickViewHeader>
                <Divider sx={{ marginY: 4 }} />
                <ListingQuickViewBody job={job} business={business}>
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
      <PagiAndPerPage
        jobs={jobs}
        cardsPerPage={cardsPerPage}
        setCardsPerPage={setCardsPerPage}
        _DATA={_DATA}
      />
    </Grid>
  );
};

ActivePosts.propTypes = {
  jobs: PropTypes.array.isRequired,
  business: PropTypes.object.isRequired,
};

export default ActivePosts;
